import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  buttonContainer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    minHeight: scale(400),
    borderWidth: 1,
    borderColor: colors.black20,
    borderRadius: scale(8),
    padding: scale(16),
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentInput: {
    flex: 1,
    fontFamily: fonts.Regular,
    fontSize: scale(14),
    color: colors.BLACK,
    minHeight: scale(350),
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: fonts.Regular,
    fontSize: scale(12),
    color: colors.errorColor,
    marginTop: scale(5),
  },
  viewTitleContainer: {
    borderWidth: 1,
    borderColor: colors.black20,
    borderRadius: scale(8),
    padding: scale(12),
    backgroundColor: colors.WHITE,
  },
  viewTitle: {
    fontFamily: fonts.Semibold,
    fontSize: scale(16),
    color: colors.BLACK,
    lineHeight: scale(22),
  },
  viewContentContainer: {
    borderWidth: 1,
    borderColor: colors.black20,
    borderRadius: scale(8),
    padding: scale(16),
    backgroundColor: colors.WHITE,
    minHeight: scale(400),
  },
  viewContent: {
    fontFamily: fonts.Regular,
    fontSize: scale(14),
    color: colors.BLACK,
    lineHeight: scale(20),
    textAlign: 'left',
  },
});
