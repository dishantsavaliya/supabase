import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { ToastManager } from '../../../utils/toast/ToastManager';
import { useAppDispatch } from '../../../redux/hooks';
import { useAuthNavigation } from '../../../navigation';
import ScreenContainer from '../../../components/screenContainer';
import { styles } from './styles';
import { strings } from '../../../constants/strings';
import SpacerView from '../../../components/spacer';
import InputField from '../../../components/InputField';
import { colors } from '../../../constants/colors';
import {
  selectedSquareIcon,
  unSelectedSquareIcon,
} from '../../../assets/icons';
import PrimaryButton from '../../../components/primaryButton';
import { rootLoader } from '../../../redux/features/ui/uiSlice';
import { emailRegex, passwordRegex, nameRegex } from '../../../utils/regex';
import { registerUser } from '../../../config/SupabaseAuth';
import { AuthData } from '../../../config/types/config';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAuthNavigation();

  const displayNameRef = useRef<TextInput | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef<TextInput | null>(null);
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const confirmPasswordRef = useRef<TextInput | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [selectedCondition, setSelectedCondition] = useState(false);

  useEffect(() => {
    if (!displayName.trim()) {
      setDisplayNameError('');
    } else if (displayName.trim().length < 2) {
      setDisplayNameError('Display name must be at least 2 characters');
    } else if (!nameRegex.test(displayName.trim())) {
      setDisplayNameError('Please enter a valid display name');
    } else {
      setDisplayNameError('');
    }
  }, [displayName]);

  useEffect(() => {
    if (!email.trim()) setEmailError('');
    else if (!emailRegex.test(email))
      setEmailError(strings.pleaseEnterValidEmail);
    else if (/[A-Z]/.test(email)) setEmailError(strings.emailLowercaseOnly);
    else setEmailError('');
  }, [email]);

  useEffect(() => {
    if (!password.trim()) setPasswordError('');
    else if (!passwordRegex.test(password))
      setPasswordError(strings.changePasswordText);
    else if (/\s/.test(password))
      setPasswordError(strings.passwordCannotContainSpaces);
    else setPasswordError('');
  }, [password]);

  useEffect(() => {
    if (!confirmPassword.trim()) setConfirmPasswordError('');
    else if (!passwordRegex.test(confirmPassword))
      setConfirmPasswordError(strings.changeConfirmPasswordText);
    else if (/\s/.test(confirmPassword))
      setConfirmPasswordError(strings.confirmPasswordCannotContainSpaces);
    else if (confirmPassword !== password)
      setConfirmPasswordError(strings.passwordsDoNotMatch);
    else setConfirmPasswordError('');
  }, [confirmPassword, password]);

  const handleSignup = async () => {
    let valid = true;
    Keyboard.dismiss();

    if (!displayName.trim()) {
      setDisplayNameError(strings.pleaseEnterDisplayName);
      valid = false;
    } else if (displayName.trim().length < 2) {
      setDisplayNameError(strings.displayNameMinLength);
      valid = false;
    } else if (!nameRegex.test(displayName.trim())) {
      setDisplayNameError(strings.pleaseEnterValidDisplayName);
      valid = false;
    } else {
      setDisplayNameError('');
    }

    if (!email.trim()) {
      setEmailError(strings.pleaseEnterEmail);
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(strings.pleaseEnterValidEmail);
      valid = false;
    } else if (/[A-Z]/.test(email)) {
      setEmailError(strings.emailLowercaseOnly);
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError(strings.pleaseEnterPassword);
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(strings.confirmPasswordMinLength);
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(strings.changePasswordText);
      valid = false;
    } else if (/\s/.test(password)) {
      setPasswordError(strings.passwordCannotContainSpaces);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError(strings.enterConfirmPassword);
      valid = false;
    } else if (confirmPassword.length < 6) {
      setConfirmPasswordError(strings.confirmPasswordMinLength);
      valid = false;
    } else if (!passwordRegex.test(confirmPassword)) {
      setConfirmPasswordError(strings.changeConfirmPasswordText);
      valid = false;
    } else if (/\s/.test(confirmPassword)) {
      setConfirmPasswordError(strings.confirmPasswordCannotContainSpaces);
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(strings.passwordsDoNotMatch);
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;
    if (!selectedCondition) {
      ToastManager.showError(strings.conditionsError);
      return;
    }

    dispatch(rootLoader(true));

    const registerData: AuthData = {
      email_address: email.trim(),
      password: password,
      first_name: displayName.trim(),
    };

    const response = await registerUser(registerData);

    if (response.success) {
      ToastManager.showSuccess(response.message!);
    } else {
      ToastManager.showError(response.message!);
    }
    dispatch(rootLoader(false));
  };

  return (
    <ScreenContainer>
      <View style={styles.contentContainer}>
        <SpacerView height={40} />
        <Text style={styles.welcomeText}>{strings.createAccount}</Text>
        <SpacerView height={5} />
        <Text style={styles.descriptionText}>
          {strings.registerDescription}
        </Text>
        <SpacerView height={40} />

        <InputField
          ref={displayNameRef}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder={strings.displayName}
          errorMsg={displayNameError}
          maxLength={30}
          autoCapitalize="words"
          keyboardType="default"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <SpacerView height={20} />
        <InputField
          ref={emailRef}
          value={email}
          onChangeText={setEmail}
          placeholder={strings.emailAddress}
          errorMsg={emailError}
          maxLength={40}
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <SpacerView height={20} />
        <InputField
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          placeholder={strings.password}
          maxLength={16}
          secureText={passwordSecure}
          secureTextOption={true}
          setSecureText={setPasswordSecure}
          errorMsg={passwordError}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <SpacerView height={20} />
        <InputField
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={strings.confirmPassword}
          maxLength={16}
          secureText={confirmPasswordSecure}
          secureTextOption={true}
          setSecureText={setConfirmPasswordSecure}
          errorMsg={confirmPasswordError}
        />
        <SpacerView height={20} />
        <View style={styles.termsAndConditionMainView}>
          <TouchableOpacity
            style={styles.unSelectedView}
            onPress={() => {
              setSelectedCondition(!selectedCondition);
            }}
          >
            <Image
              source={
                selectedCondition ? selectedSquareIcon : unSelectedSquareIcon
              }
              resizeMode="contain"
              tintColor={colors.black40}
            />
          </TouchableOpacity>
          <View style={styles.termsAndConditionView}>
            <Text style={styles.normalText}>
              {strings.iAgree}
              {strings.privacy_policy}
              {''} {strings.and}
              {strings.terms_conditions}
            </Text>
          </View>
        </View>
        <SpacerView height={35} />
        <PrimaryButton title={strings.signUpCapital} onPress={handleSignup} />
        <SpacerView height={50} />
        <Text style={styles.alreadyAccountText}>
          {strings.alreadyHaveAccount}
          {''}
          <Text
            onPress={() => navigation.goBack()}
            style={[styles.signUpText, { marginLeft: 5 }]}
          >
            {strings.login}
          </Text>
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default RegisterScreen;
