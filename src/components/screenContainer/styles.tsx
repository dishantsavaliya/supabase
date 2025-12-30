import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 0,
    flex: 1,
    backgroundColor: colors.BgColor,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
