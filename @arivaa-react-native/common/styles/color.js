const primaryColor = '#fc404e';
const primaryGreyColor = '#9c9c9c';
const secondaryColor = '#27282d';
const screenBackground = '#27282d';
const textColor = '#383838';
const inputBackgroundColor = '#ef2738';
const borderColor = '#e9e9e9';
const brandGreen = '#81ab3f';
const brandYellow = '#febd69';
const brandGrey = '#333';
const brandLightGrey = '#e6e6e6';
const brandRed = '#e44549';
const brandFacebook = 'rgba(59,89,152,1)';
const brandGoogle = '#de5449';
const facebookColor = '#4267b2';
const googleColor = '#dc493c';
const getDefinedColor = (color) => {
  return global.arivaa && global.arivaa.colors && global.arivaa.colors[color];
};
export default {
  get primaryColor() {
    return getDefinedColor('primaryColor') || primaryColor;
  },
  get primaryGreyColor() {
    return getDefinedColor('primaryGreyColor') || primaryGreyColor;
  },
  get textColor() {
    return getDefinedColor('textColor') || textColor;
  },
  get secondaryColor() {
    return getDefinedColor('secondaryColor') || secondaryColor;
  },
  get screenBackground() {
    return getDefinedColor('screenBackground') || screenBackground;
  },
  get borderColor() {
    return getDefinedColor('borderColor') || borderColor;
  },
  get inputBackgroundColor() {
    return getDefinedColor('inputBackgroundColor') || inputBackgroundColor;
  },
  get brandGreen() {
    return getDefinedColor('brandGreen') || brandGreen;
  },
  get brandYellow() {
    return getDefinedColor('brandYellow') || brandYellow;
  },
  get brandGrey() {
    return getDefinedColor('brandGrey') || brandGrey;
  },
  get brandLightGrey() {
    return getDefinedColor('brandLightGrey') || brandLightGrey;
  },
  get brandRed() {
    return getDefinedColor('brandRed') || brandRed;
  },
  get brandFacebook() {
    return getDefinedColor('brandFacebook') || brandFacebook;
  },
  get brandGoogle() {
    return getDefinedColor('brandGoogle') || brandGoogle;
  },
  get facebookColor() {
    return getDefinedColor('facebookColor') || facebookColor;
  },
  get googleColor() {
    return getDefinedColor('googleColor') || googleColor;
  },
};
