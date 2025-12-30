import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { fonts } from '../../../constants/fonts';
import { colors } from '../../../constants/colors';
import { textVariants } from '../../../constants/typography';

export const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: scale(20),
    flex: 1,
  },
  welcomeText: {
    ...textVariants.font_20,
    color: colors.BLACK,
    textAlign: 'center',
    fontFamily: fonts.Semibold,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 16,
    height: 98,
  },
  descriptionText: {
    ...textVariants.font_13,
    color: colors.black50,
    alignSelf: 'center',
    fontFamily: fonts.Regular,
  },
  noAccountText: {
    ...textVariants.font_14,
    textAlign: 'center',
    color: colors.black50,
    alignSelf: 'center',
    padding: 5,
  },
  signUpText: {
    ...textVariants.font_14,
    color: colors.burntOrange,
    fontFamily: fonts.Semibold,
    marginLeft: 5,
  },
});
