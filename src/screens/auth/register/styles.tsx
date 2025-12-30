import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { textVariants } from '../../../constants/typography';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  contentContainer: { marginHorizontal: scale(20), flex: 1 },
  welcomeText: {
    ...textVariants.font_24,
    color: colors.BLACK,
    alignSelf: 'center',
    fontFamily: fonts.Semibold,
  },
  termsAndConditionMainView: { flexDirection: 'row' },
  unSelectedView: { height: 24, width: 24 },
  termsAndConditionView: { justifyContent: 'center', marginRight: 20 },
  normalText: {
    ...textVariants.font_12,
    color: colors.black50,
    fontFamily: fonts.Regular,
    marginLeft: 5,
    alignSelf: 'center',
  },
  alreadyAccountText: {
    ...textVariants.font_14,
    textAlign: 'center',
    color: colors.black50,
    position: 'absolute',
    bottom: scale(15),
    alignSelf: 'center',
    padding: 5,
  },
  signUpText: {
    ...textVariants.font_14,
    color: colors.burntOrange,
    fontFamily: fonts.Semibold,
  },
  descriptionText: {
    ...textVariants.font_13,
    color: colors.black50,
    alignSelf: 'center',
    fontFamily: fonts.Regular,
  },
});
