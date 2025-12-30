import { AuthData } from './types/config';
import Logger from '../utils/logger';
import { supabase } from './supabase';
import { strings } from '../constants/strings';

export async function loginUser(data: AuthData) {
  try {
    let email = (data.email_address || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        message: strings.pleaseEnterValidEmail,
      };
    }

    if (!data.password || data.password.length < 6) {
      return {
        success: false,
        message: strings.confirmPasswordMinLength,
      };
    }

    email = email.replace(/\s+/g, '');

    Logger.log('Attempting to login with email:', email);

    // Sign in user with Supabase
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: data.password || '',
      });

    if (signInError) {
      Logger.error('Supabase Login Error:', signInError);
      Logger.error('Email being used:', email);
      Logger.error('Error message:', signInError.message);

      let errorMessage = signInError.message || 'Login failed';

      // Handle specific error cases
      if (
        errorMessage.includes('Invalid login credentials') ||
        errorMessage.includes('invalid') ||
        errorMessage.includes('Invalid')
      ) {
        errorMessage = 'Invalid email or password';
      } else if (
        errorMessage.includes('Email not confirmed') ||
        errorMessage.includes('email not confirmed')
      ) {
        errorMessage = 'Please verify your email address before logging in';
      } else if (errorMessage.includes('password')) {
        errorMessage = 'Invalid password';
      }

      return { success: false, message: errorMessage };
    }

    if (!signInData.session || !signInData.user) {
      return {
        success: false,
        message: 'Login failed. Please try again.',
      };
    }

    // Supabase client automatically handles token storage in AsyncStorage
    Logger.log('User logged in successfully:', signInData.user.id);

    return {
      success: true,
      data: signInData.user,
      message: 'Login successful!',
    };
  } catch (error) {
    Logger.error('Login Error:', error);
    return { success: false, message: 'Oops, Something Went Wrong' };
  }
}

export async function registerUser(data: AuthData) {
  try {
    let email = (data.email_address || '').trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        message: strings.pleaseEnterValidEmail,
      };
    }

    // Validate password
    if (!data.password || data.password.length < 6) {
      return {
        success: false,
        message: strings.confirmPasswordMinLength,
      };
    }

    // Ensure email is properly formatted (remove any extra spaces)
    email = email.replace(/\s+/g, '');

    Logger.log('Attempting to register with email:', email);

    // Register user with Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email,
        password: data.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            display_name: data.first_name || '',
          },
        },
      },
    );

    if (signUpError) {
      Logger.error('Supabase Register Error:', signUpError);
      Logger.error('Email being used:', email);
      Logger.error('Error code:', signUpError.status);
      Logger.error('Error message:', signUpError.message);

      let errorMessage = signUpError.message || 'Registration failed';

      // Handle specific error cases
      if (
        errorMessage.includes('already registered') ||
        errorMessage.includes('already exists') ||
        errorMessage.includes('already been registered')
      ) {
        errorMessage = 'This email is already registered';
      } else if (
        errorMessage.includes('invalid') ||
        errorMessage.includes('Invalid')
      ) {
        errorMessage = strings.pleaseEnterValidEmail;
      } else if (errorMessage.includes('password')) {
        errorMessage = 'Password does not meet requirements';
      }

      return { success: false, message: errorMessage };
    }

    if (!signUpData.user) {
      return {
        success: false,
        message: 'Registration failed. Please try again.',
      };
    }

    // Sign in user after registration
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: data.password || '',
      });

    if (signInError) {
      Logger.error('Supabase Sign In Error:', signInError);

      // Handle email not confirmed error
      if (
        signInError.message.includes('Email not confirmed') ||
        signInError.message.includes('email not confirmed') ||
        signInError.message.includes('not confirmed')
      ) {
        return {
          success: true,
          data: { user: signUpData.user },
          message:
            'Registration successful! Please check your email to confirm your account, then log in.',
        };
      }

      return {
        success: false,
        message:
          signInError.message ||
          'Registration successful but login failed. Please try logging in.',
      };
    }

    if (!signInData.session || !signInData.user) {
      return {
        success: true,
        data: { user: signUpData.user },
        message:
          'Registration successful! Please check your email to confirm your account.',
      };
    }

    // Supabase client automatically handles token storage in AsyncStorage
    Logger.log(
      'User registered and logged in successfully:',
      signInData.user.id,
    );

    return {
      success: true,
      data: signInData.user,
      message: 'Registration successful! You are now logged in.',
    };
  } catch (error) {
    Logger.error('Register Error:', error);
    return { success: false, message: 'Oops, Something Went Wrong' };
  }
}
