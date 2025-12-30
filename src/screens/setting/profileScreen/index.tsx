import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { useDashboardNavigation } from '../../../navigation';
import { AppDispatch } from '../../../redux/store';
import { useAppDispatch } from '../../../redux/hooks';
import { rootLoader } from '../../../redux/features/ui/uiSlice';
import { supabase } from '../../../config/supabase';
import Logger from '../../../utils/logger';
import { ToastManager } from '../../../utils/toast/ToastManager';
import ScreenContainerView from '../../../components/screenContainerView';
import TitleHeader from '../../../components/titleHeader';
import {
  emailIcon,
  leftBackIcon,
  profilePlaceholderIcon,
} from '../../../assets/icons';
import { strings } from '../../../constants/strings';
import ScreenContainerSubView from '../../../components/screenContainerSubView';
import SpacerView from '../../../components/spacer';
import { colors } from '../../../constants/colors';
import DeleteBottomSheet from '../../../components/deleteBottomSheet';
import type { User } from '@supabase/supabase-js';

const ProfileScreen = () => {
  const navigation = useDashboardNavigation();
  const [showDeleteConfirmation, setDeleteBottomSheetShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
  }, []);

  const handleDeleteAccount = async () => {
    setDeleteBottomSheetShow(false);
    dispatch(rootLoader(true));

    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        ToastManager.showError(strings.userNotAuthenticated);
        dispatch(rootLoader(false));
        return;
      }

      // First, delete all user's notes
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('user_id', currentUser.id);

      if (notesError) {
        Logger.error('Error deleting user notes:', notesError);
      }

      const { error: deleteError } = await supabase.functions.invoke(
        'delete-user',
        {
          body: { userId: currentUser.id },
        },
      );

      if (deleteError) {
        Logger.warn(
          'Edge Function not available, signing out only:',
          deleteError,
        );
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          Logger.error('Sign out error:', signOutError);
          ToastManager.showError(strings.failedToDeleteAccount);
        } else {
          ToastManager.showSuccess(strings.accountDataDeleted);
        }
      } else {
        // Successfully deleted via Edge Function
        ToastManager.showSuccess(strings.accountDeletedSuccess);
      }
    } catch (error) {
      Logger.error('Delete account error:', error);
      ToastManager.showError(strings.failedToDeleteAccount);
    }

    dispatch(rootLoader(false));
  };

  return (
    <>
      <ScreenContainerView>
        <TitleHeader
          leftIcon={leftBackIcon}
          title={strings.profile}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScreenContainerSubView>
          <View style={styles.innerMainView}>
            <SpacerView height={25} />
            <View style={styles.imageMainView}>
              <Image
                source={profilePlaceholderIcon}
                style={styles.fastImages}
              />
            </View>
            <SpacerView height={20} />
            <Text style={styles.nameTxt}>
              {user?.user_metadata?.display_name || ''}
            </Text>
            <SpacerView height={20} />
            <View style={styles.viewLine} />
            <SpacerView height={15} />
            <View style={styles.emailView}>
              <Image
                source={emailIcon}
                style={styles.emailIcon}
                tintColor={colors.black50}
              />
              <Text style={styles.emailTxt}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.deleteAccountContainer}>
            <TouchableOpacity
              style={styles.deleteAccountButton}
              onPress={() => setDeleteBottomSheetShow(true)}
            >
              <Text style={styles.deleteAccountText}>
                {strings.delete_account.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </ScreenContainerSubView>
      </ScreenContainerView>
      <DeleteBottomSheet
        visible={showDeleteConfirmation}
        onClose={() => setDeleteBottomSheetShow(false)}
        onConfirm={handleDeleteAccount}
        title={strings.delete_account}
        message={strings.deleteAccountConfirmation}
        cancelText={strings.cancel.toUpperCase()}
        confirmText={strings.delete.toUpperCase()}
        isForceClose={false}
        initialIndex={-1}
      />
    </>
  );
};

export default ProfileScreen;
