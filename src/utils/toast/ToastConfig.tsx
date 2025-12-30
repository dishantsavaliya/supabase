import { ToastConfig as RNToastConfig } from 'react-native-toast-message/lib/src/types/index';
import {
  errorIcon,
  infoIcon,
  successIcon,
  warningIcon,
} from '../../assets/icons';
import { colors } from '../../constants/colors';
import CustomToast from '../../components/customToast';
import { ToastConfigProps } from './types';

export const toastConfig: RNToastConfig = {
  error: ({ text1 }: ToastConfigProps) => (
    <CustomToast
      toastBg={colors.errorColor}
      toastIcon={errorIcon}
      text1={text1}
    />
  ),
  info: ({ text1 }: ToastConfigProps) => (
    <CustomToast
      toastBg={colors.infoColor}
      toastIcon={infoIcon}
      text1={text1}
    />
  ),
  success: ({ text1 }: ToastConfigProps) => (
    <CustomToast
      toastBg={colors.successColor}
      toastIcon={successIcon}
      text1={text1}
    />
  ),
  warning: ({ text1 }: ToastConfigProps) => (
    <CustomToast
      toastBg={colors.warningColor}
      toastIcon={warningIcon}
      text1={text1}
    />
  ),
};
