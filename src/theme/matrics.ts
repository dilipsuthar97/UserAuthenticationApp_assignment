import {Dimensions, PixelRatio, Platform} from 'react-native';
import {s, ms, vs, mvs} from 'react-native-size-matters';

const factorValue = Platform.OS === 'android' ? 0.05 : 0.1;

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const FONT_SCALE = Dimensions.get('window').fontScale;

const windowHeight = (height: number) => {
  // var size = SCREEN_HEIGHT > 720 ? 720 : 667;
  const tempHeight = (SCREEN_HEIGHT * height) / 667;
  return PixelRatio.roundToNearestPixel(tempHeight);
};

const windowWidth = (width: number) => {
  const tempWidth = (SCREEN_WIDTH * width) / 375;
  return PixelRatio.roundToNearestPixel(tempWidth);
};

export const fontSizes = {
  FONT8: mvs(8, 0.15),
  FONT10: mvs(10, 0.15),
  FONT11: mvs(11, 0.15),
  FONT12: mvs(12, 0.15),
  FONT13: mvs(13, 0.15),
  FONT14: mvs(14, 0.15),
  FONT15: mvs(15, 0.15),
  FONT16: mvs(16, 0.15),
  FONT17: mvs(17, 0.15),
  FONT18: mvs(18, 0.15),
  FONT19: mvs(19, 0.15),
  FONT20: mvs(20, 0.15),
  FONT22: mvs(22, 0.15),
  FONT24: mvs(24, 0.15),
  FONT26: mvs(26, 0.15),
  FONT28: mvs(28, 0.15),
  FONT30: mvs(30, 0.15),
  FONT32: mvs(32, 0.15),
  FONT34: mvs(34, 0.15),
  FONT36: mvs(36, 0.15),
  FONT40: mvs(40, 0.15),
  FONT42: mvs(42, 0.15),
  FONT50: mvs(50, 0.15),
};

export const scale = {
  s,
  ms: (size: number, factor: number | undefined = factorValue) => ms(size, factor),
  vs,
  mvs: (size: number, factor: number | undefined = factorValue) => mvs(size, factor),
  font: (size: number) => mvs(size, 0.15),
  windowHeight,
  windowWidth,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FONT_SCALE,
  borderRadius: ms(12),
};

export const spaces = {
  PAGE_PADDING_H: scale.ms(14),
  PAGE_PADDING_V: scale.mvs(14),
  PAGE_PADDING: scale.ms(14),
  BORDER_RADIUS: scale.ms(14),
  PAGE_PADDING_PERCENT: '4%',
};
