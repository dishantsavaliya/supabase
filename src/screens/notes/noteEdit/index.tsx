import { Keyboard, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDashboardNavigation } from '../../../navigation';
import type { DashboardStackParamList } from '../../../navigation/types';
import ScreenContainerView from '../../../components/screenContainerView';
import ScreenContainerSubView from '../../../components/screenContainerSubView';
import TitleHeader from '../../../components/titleHeader';
import { leftBackIcon } from '../../../assets/icons';
import { strings } from '../../../constants/strings';
import { styles } from './styles';
import SpacerView from '../../../components/spacer';
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/primaryButton';
import { ToastManager } from '../../../utils/toast/ToastManager';
import { AppDispatch } from '../../../redux/store';
import { useAppDispatch } from '../../../redux/hooks';
import { rootLoader } from '../../../redux/features/ui/uiSlice';
import { supabase } from '../../../config/supabase';
import Logger from '../../../utils/logger';
import { Note } from '../../../config/types/note';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

type NoteEditRouteProp = RouteProp<DashboardStackParamList, 'NoteEditScreen'>;

const NoteEditScreen = () => {
  const navigation = useDashboardNavigation();
  const route = useRoute<NoteEditRouteProp>();
  const dispatch: AppDispatch = useAppDispatch();
  const { noteId, viewOnly = false } = route.params ?? {};

  const [existingNote, setExistingNote] = useState<Note | null>(null);
  const [loadingNote, setLoadingNote] = useState(false);

  const isEditing = !!noteId;
  const isViewOnly = viewOnly && isEditing;

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId) return;

      setLoadingNote(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoadingNote(false);
          return;
        }

        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', noteId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          Logger.error('Error loading note:', error);
        } else {
          setExistingNote(data as Note);
          setTitle(data.title || '');
          setContent(data.content || '');
        }
      } catch (error) {
        Logger.error('Load note error:', error);
      }
      setLoadingNote(false);
    };

    loadNote();
  }, [noteId]);

  const titleRef = useRef<TextInput | null>(null);
  const contentRef = useRef<TextInput | null>(null);

  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');


  useEffect(() => {
    if (!title.trim()) {
      setTitleError('');
    } else if (title.trim().length < 1) {
      setTitleError(strings.titleRequired);
    } else {
      setTitleError('');
    }
  }, [title]);

  useEffect(() => {
    if (!content.trim()) {
      setContentError('');
    } else {
      setContentError('');
    }
  }, [content]);

  const handleSave = async () => {
    Keyboard.dismiss();

    let valid = true;

    if (!title.trim()) {
      setTitleError(strings.titleRequired);
      valid = false;
    }

    if (!content.trim()) {
      setContentError(strings.contentRequired);
      valid = false;
    }

    if (!valid) return;

    dispatch(rootLoader(true));

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        ToastManager.showError(strings.userNotAuthenticated);
        dispatch(rootLoader(false));
        return;
      }

      if (isEditing && noteId) {
        // Update existing note
        const { data, error } = await supabase
          .from('notes')
          .update({
            title: title.trim(),
            content: content.trim(),
          })
          .eq('id', noteId)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) {
          Logger.error('Error updating note:', error);
          ToastManager.showError(error.message || strings.failedToUpdateNote);
        } else {
          ToastManager.showSuccess(strings.noteUpdatedSuccess);
          navigation.goBack();
        }
      } else {
        // Create new note
        const { data, error } = await supabase
          .from('notes')
          .insert([
            {
              title: title.trim(),
              content: content.trim(),
              user_id: user.id,
            },
          ])
          .select()
          .single();

        if (error) {
          Logger.error('Error creating note:', error);
          ToastManager.showError(error.message || strings.failedToCreateNote);
        } else {
          ToastManager.showSuccess(strings.noteCreatedSuccess);
          navigation.goBack();
        }
      }
    } catch (error) {
      Logger.error('Save note error:', error);
      ToastManager.showError(strings.somethingWentWrong);
    }

    dispatch(rootLoader(false));
  };

  return (
    <ScreenContainerView>
      <TitleHeader
        leftIcon={leftBackIcon}
        title={
          isViewOnly
            ? strings.viewNote
            : isEditing
            ? strings.editNote
            : strings.createNote
        }
        onPressLeft={() => navigation.goBack()}
      />
      <ScreenContainerSubView>
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <SpacerView height={20} />
            {isViewOnly ? (
              <>
                <View style={styles.viewTitleContainer}>
                  <Text style={styles.viewTitle}>
                    {title || strings.untitledNote}
                  </Text>
                </View>
                <SpacerView height={20} />
                <View style={styles.viewContentContainer}>
                  <Text style={styles.viewContent}>
                    {content || 'No content'}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <InputField
                  ref={titleRef}
                  value={title}
                  onChangeText={setTitle}
                  placeholder={strings.noteTitlePlaceholder}
                  errorMsg={titleError}
                  maxLength={100}
                  textInputStyle={{ fontFamily: fonts.Regular }}
                  onSubmitEditing={() => contentRef.current?.focus()}
                />
                <SpacerView height={20} />
                <View style={styles.contentContainer}>
                  <TextInput
                    ref={contentRef}
                    style={styles.contentInput}
                    value={content}
                    onChangeText={setContent}
                    placeholder={strings.noteContentPlaceholder}
                    placeholderTextColor={colors.black50}
                    multiline
                    textAlignVertical="top"
                    maxLength={5000}
                  />
                  {contentError ? (
                    <Text style={styles.errorText}>{contentError}</Text>
                  ) : null}
                </View>
              </>
            )}
          </ScrollView>
          {!isViewOnly && (
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title={isEditing ? strings.updateNote : strings.createNote}
                onPress={handleSave}
              />
            </View>
          )}
        </View>
      </ScreenContainerSubView>
      <SafeAreaView edges={['bottom']} />
    </ScreenContainerView>
  );
};

export default NoteEditScreen;
