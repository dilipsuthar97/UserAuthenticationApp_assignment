import {StyleSheet} from 'react-native';
import {fontSizes, scale} from './matrics';
import colors from './colors';
import fonts from './fonts';

const mainStyles = StyleSheet.create({
  header: {
    paddingLeft: 0,
  },
  headerTitle: {
    fontSize: fontSizes.FONT16,
    color: colors.textPrimary,
    fontFamily: fonts.semiBold,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: scale.ms(15),
  },
  screenWrapper: {
    flex: 1,
  },
  inputContainer: {
    height: scale.mvs(50),
    flexDirection: 'row',
    borderRadius: scale.mvs(60 / 2),
    backgroundColor: colors.inputTextBackground,
    paddingHorizontal: scale.ms(18),
  },
  padding: {
    padding: scale.ms(15),
  },
  tabBarItem: {
    marginBottom: scale.vs(6),
  },
  tabBarShadow: {
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    elevation: 6,
  },
});

export default mainStyles;
