import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDashboardNavigation } from '../../navigation';
import ScreenContainerView from '../../components/screenContainerView';
import { styles } from './styles';
import SpacerView from '../../components/spacer';
import { strings } from '../../constants/strings';
import LogoutBottomSheet from '../../components/logoutBottomSheet';
import DeleteBottomSheet from '../../components/deleteBottomSheet';
import { ToastManager } from '../../utils/toast/ToastManager';
import Logger from '../../utils/logger';
import { AppDispatch } from '../../redux/store';
import { useAppDispatch } from '../../redux/hooks';
import { rootLoader } from '../../redux/features/ui/uiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { supabase } from '../../config/supabase';
import TitleHeader from '../../components/titleHeader';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { Note } from '../../config/types/note';
import { deleteIcon, editProfileIcon } from '../../assets/icons';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen = () => {
  const navigation = useDashboardNavigation();

  const [showLogoutModel, setShowLogoutModel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch: AppDispatch = useAppDispatch();
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Reload notes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const loadNotes = async () => {
    setNotesLoading(true);
    setIsOffline(false);
    try {
      // Check network connectivity
      const networkState = await NetInfo.fetch();
      const online = networkState.isConnected ?? false;

      if (!online) {
        setIsOffline(true);
        ToastManager.showError(
          'No internet connection. Please connect to load notes.',
        );
        setNotesLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        ToastManager.showError(strings.userNotAuthenticated);
        setNotesLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        Logger.error('Error fetching notes:', error);
        ToastManager.showError(error.message || strings.failedToLoadNotes);
        setIsOffline(true);
      } else {
        setNotes(data as Note[]);
        setIsOffline(false);
      }
    } catch (error) {
      Logger.error('Load notes error:', error);
      ToastManager.showError(strings.failedToLoadNotes);
      setIsOffline(true);
    }
    setNotesLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }, []);

  const handleLogoutAccount = async () => {
    setShowLogoutModel(false);
    setShowMenu(false);
    dispatch(rootLoader(true));

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Logger.error('Logout error:', error);
        ToastManager.showError(strings.somethingWentWrongLogout);
      } else {
        // Dispatch logout action to clear Redux state
        dispatch(logout());
        ToastManager.showSuccess(strings.loggedOutSuccess);
      }
    } catch (error) {
      Logger.error('Logout error:', error);
      ToastManager.showError(strings.somethingWentWrongLogout);
    }
    dispatch(rootLoader(false));
  };

  const handleProfilePress = () => {
    setShowMenu(false);
    navigation.navigateToProfile();
  };

  const handleLogoutPress = () => {
    setShowMenu(false);
    setShowLogoutModel(true);
  };

  const handleCreateNote = () => {
    navigation.navigateToNoteEdit();
  };

  const handleEditNote = (noteId: string) => {
    navigation.navigateToNoteEdit({ noteId });
  };

  const handleViewNote = (noteId: string) => {
    navigation.navigateToNoteEdit({ noteId, viewOnly: true });
  };

  const handleDeleteNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setShowDeleteModal(true);
  };

  const confirmDeleteNote = async () => {
    if (!selectedNoteId) return;

    setShowDeleteModal(false);
    dispatch(rootLoader(true));

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        ToastManager.showError(strings.userNotAuthenticated);
        dispatch(rootLoader(false));
        setSelectedNoteId(null);
        return;
      }

      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', selectedNoteId)
        .eq('user_id', user.id);

      if (error) {
        Logger.error('Error deleting note:', error);
        ToastManager.showError(error.message || strings.failedToDeleteNote);
      } else {
        setNotes(prevNotes =>
          prevNotes.filter(note => note.id !== selectedNoteId),
        );
        ToastManager.showSuccess(strings.noteDeletedSuccess);
      }
    } catch (error) {
      Logger.error('Delete note error:', error);
      ToastManager.showError(strings.somethingWentWrong);
    }

    dispatch(rootLoader(false));
    setSelectedNoteId(null);
  };

  const renderThreeDotIcon = () => (
    <TouchableOpacity
      onPress={() => setShowMenu(!showMenu)}
      style={styles.threeDotContainer}
      activeOpacity={0.7}
    >
      <View style={styles.threeDot}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </TouchableOpacity>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => handleViewNote(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteTitleContainer}>
          <Text style={styles.noteTitle} numberOfLines={2}>
            {item.title || strings.untitledNote}
          </Text>
        </View>
        <View style={styles.noteActions}>
          <TouchableOpacity
            onPress={() => handleEditNote(item.id)}
            style={styles.editButton}
          >
            <Image
              source={editProfileIcon}
              style={styles.editIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteNote(item.id)}
            style={styles.deleteButton}
          >
            <Image
              source={deleteIcon}
              style={styles.deleteIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {item.content ? (
        <Text style={styles.noteContent} numberOfLines={3}>
          {item.content}
        </Text>
      ) : (
        <Text style={styles.noteContentEmpty}>{strings.noContent}</Text>
      )}
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{formatDate(item.updated_at)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => {
    if (isOffline) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Internet Connection</Text>
          <Text style={styles.emptySubText}>
            Please check your internet connection and try again
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{strings.noNotesYet}</Text>
        <Text style={styles.emptySubText}>{strings.createFirstNote}</Text>
      </View>
    );
  };

  return (
    <>
      <ScreenContainerView>
        <View style={styles.headerContainer}>
          <TitleHeader
            title={strings.myNotes}
            rightIcon={undefined}
            onPressRight={undefined}
            customRightComponent={renderThreeDotIcon()}
          />
          {showMenu && (
            <Modal
              transparent={true}
              visible={showMenu}
              onRequestClose={() => setShowMenu(false)}
            >
              <TouchableOpacity
                style={styles.menuOverlay}
                activeOpacity={1}
                onPress={() => setShowMenu(false)}
              >
                <View style={styles.menuWrapper}>
                  <View style={styles.menuContainer}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={handleProfilePress}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.menuItemText}>{strings.profile}</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={handleLogoutPress}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.menuItemText}>{strings.logOut}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
        <View style={styles.contentWrapper}>
          {notesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.burntOrange} />
            </View>
          ) : (
            <>
              <View style={styles.container}>
                <FlatList
                  data={notes}
                  renderItem={renderNoteItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={
                    notes.length === 0
                      ? styles.emptyListContainer
                      : styles.listContainer
                  }
                  ListEmptyComponent={renderEmptyList}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <TouchableOpacity
                style={styles.fabButton}
                onPress={handleCreateNote}
                activeOpacity={0.8}
              >
                <Text style={styles.fabButtonText}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScreenContainerView>
      <LogoutBottomSheet
        visible={showLogoutModel}
        onClose={() => setShowLogoutModel(false)}
        onConfirm={handleLogoutAccount}
        title={strings.logOut}
        message={strings.logoutConfirmation}
        cancelText={strings.logOut.toUpperCase()}
        confirmText={strings.cancel.toUpperCase()}
        isForceClose={false}
        initialIndex={-1}
        description={strings.logoutDesc}
      />
      <DeleteBottomSheet
        visible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedNoteId(null);
        }}
        onConfirm={confirmDeleteNote}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        cancelText="CANCEL"
        confirmText="DELETE"
        isForceClose={false}
        initialIndex={-1}
        description="This action cannot be undone."
      />
    </>
  );
};

export default HomeScreen;
