import Logger from '../utils/logger';
import { supabase } from './supabase';
import { Note, CreateNoteData, UpdateNoteData } from './types/note';
import NetInfo from '@react-native-community/netinfo';
import { strings } from '../constants/strings';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// Check if device is online
const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

// Get current user ID from Supabase session
const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    Logger.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Fetch all notes for the current user
 */
export async function fetchNotes(): Promise<ApiResponse<Note[]>> {
    try {
      const online = await isOnline();
      const userId = await getCurrentUserId();

      if (!userId) {
        return {
          success: false,
          message: strings.userNotAuthenticated,
        };
      }

      if (!online) {
        return {
          success: false,
          message: 'No internet connection. Please connect to load notes.',
        };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        Logger.error('Error fetching notes:', error);
        return {
          success: false,
          message: error.message || strings.failedToLoadNotes,
        };
      }

      return {
        success: true,
        message: 'Notes fetched successfully',
        data: data as Note[],
      };
    } catch (error) {
      Logger.error('Fetch notes error:', error);
      return {
        success: false,
        message: strings.failedToLoadNotes,
      };
    }
}

/**
 * Create a new note
 */
export async function createNote(noteData: CreateNoteData): Promise<ApiResponse<Note>> {
    try {
      const online = await isOnline();
      const userId = await getCurrentUserId();

      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      if (!online) {
        return {
          success: false,
          message: strings.noInternetCreateNote,
        };
      }

      const { data, error } = await supabase
        .from('notes')
        .insert([{ ...noteData, user_id: userId }])
        .select()
        .single();

      if (error) {
        Logger.error('Error creating note:', error);
        return {
          success: false,
          message: error.message || strings.failedToCreateNote,
        };
      }

      return {
        success: true,
        message: strings.noteCreatedSuccess,
        data: data as Note,
      };
    } catch (error) {
      Logger.error('Create note error:', error);
      return {
        success: false,
        message: strings.failedToCreateNote,
      };
    }
}

/**
 * Update an existing note
 */
export async function updateNote(noteId: string, noteData: UpdateNoteData): Promise<ApiResponse<Note>> {
    try {
      const online = await isOnline();
      const userId = await getCurrentUserId();

      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      if (!online) {
        return {
          success: false,
          message: strings.noInternetUpdateNote,
        };
      }

      const { data, error } = await supabase
        .from('notes')
        .update({ ...noteData, updated_at: new Date().toISOString() })
        .eq('id', noteId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        Logger.error('Error updating note:', error);
        return {
          success: false,
          message: error.message || strings.failedToUpdateNote,
        };
      }

      if (!data) {
        return {
          success: false,
          message: 'Note not found',
        };
      }

      return {
        success: true,
        message: strings.noteUpdatedSuccess,
        data: data as Note,
      };
    } catch (error) {
      Logger.error('Update note error:', error);
      return {
        success: false,
        message: strings.failedToUpdateNote,
      };
    }
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string): Promise<ApiResponse<void>> {
    try {
      const online = await isOnline();
      const userId = await getCurrentUserId();

      if (!userId) {
        return {
          success: false,
          message: 'User not authenticated',
        };
      }

      if (!online) {
        return {
          success: false,
          message: strings.noInternetDeleteNote,
        };
      }

      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', userId);

      if (error) {
        Logger.error('Error deleting note:', error);
        return {
          success: false,
          message: error.message || strings.failedToDeleteNote,
        };
      }

      return {
        success: true,
        message: strings.noteDeletedSuccess,
      };
    } catch (error) {
      Logger.error('Delete note error:', error);
      return {
        success: false,
        message: strings.failedToDeleteNote,
      };
    }
}

