import { Platform, StatusBar, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentContainerStyle: { flexGrow: 1, paddingBottom: scale(25) },
});
