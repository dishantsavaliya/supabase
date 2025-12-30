import { Keyboard, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../../constants/fonts';
import { ToastManager } from '../../../utils/toast/ToastManager';
import { useAppDispatch } from '../../../redux/hooks';
import { useAuthNavigation } from '../../../navigation';
import ScreenContainer from '../../../components/screenContainer';
import { styles } from './styles';
import SpacerView from '../../../components/spacer';
import { strings } from '../../../constants/strings';
import InputField from '../../../components/InputField';
import PrimaryButton from '../../../components/primaryButton';
import { emailRegex, passwordRegex } from '../../../utils/regex';
import { AuthData } from '../../../config/types/config';
import { rootLoader } from '../../../redux/features/ui/uiSlice';
import { loginUser } from '../../../config/SupabaseAuth';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAuthNavigation();

  const emailRef = useRef<TextInput | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const passwordRef = useRef<TextInput | null>(null);
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!email.trim()) setEmailError('');
    else if (!emailRegex.test(email))
      setEmailError(strings.pleaseEnterValidEmail);
    else if (/[A-Z]/.test(email)) setEmailError(strings.emailLowercaseOnly);
    else setEmailError('');
  }, [email]);

  const handleUserLogin = async () => {
    let valid = true;
    Keyboard.dismiss();

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

    if (!valid) return;

    const params: AuthData = {
      email_address: email,
      password,
    };

    return performLogin(params);
  };

  const performLogin = async (loginParams: AuthData) => {
    dispatch(rootLoader(true));

    const response = await loginUser(loginParams);

    if (response.success) {
      ToastManager.showSuccess(response.message!);
    } else {
      ToastManager.showError(response.message!);
    }
    dispatch(rootLoader(false));
  };

  return (
    <>
      <ScreenContainer>
        <View style={styles.contentContainer}>
          <SpacerView height={20} />
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Text style={styles.welcomeText}>{strings.welcome}</Text>
            <SpacerView height={5} />
            <Text style={styles.descriptionText}>
              {strings.loginDescription}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 80,
            }}
          >
            <InputField
              ref={emailRef}
              value={email}
              onChangeText={setEmail}
              placeholder={strings.emailAddress}
              errorMsg={emailError}
              textInputStyle={{ fontFamily: fonts.Regular }}
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
            />
            <SpacerView height={12} />

            <SpacerView height={35} />
            <PrimaryButton
              title={strings.loginCapital}
              onPress={handleUserLogin}
            />
          </View>

          <SpacerView height={35} />
          <Text style={styles.noAccountText}>
            {strings.noAccount}
            {''}
            <Text
              onPress={() => {
                setEmail('');
                setPassword('');
                navigation.navigateToRegister();
              }}
              style={styles.signUpText}
            >
              {strings.signUp}
            </Text>
          </Text>
        </View>
        <SafeAreaView edges={['bottom']} />
      </ScreenContainer>
    </>
  );
};

export default LoginScreen;
