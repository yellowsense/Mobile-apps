import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const STANDARD_WIDTH = 414;
const STANDARD_HEIGHT = 874;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const dynamicSize = (size) => {
  return K * size;
};

export const getFontSize = (size) => {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
};

export const wpx = (horizPX) => {
  return widthPercentageToDP((horizPX / STANDARD_WIDTH) * 100);
};
export const hpx = (vertPX) => {
  return heightPercentageToDP((vertPX / STANDARD_HEIGHT) * 100);
};

export const wp = (percentage) => {
  return widthPercentageToDP(percentage);
};
export const hp = (percentage) => {
  return heightPercentageToDP(percentage);
};
