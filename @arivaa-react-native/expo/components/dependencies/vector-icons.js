const iconPath = 'react-native-vector-icons/dist/';
const {
  createIconSet,
  createIconSetFromFontello,
  createIconSetFromIcoMoon,
} = require(iconPath);
module.exports = {
  get Entypo() {
    return require(iconPath + 'Entypo').default;
  },
  get EvilIcons() {
    return require(iconPath + 'EvilIcons').default;
  },
  get Feather() {
    return require(iconPath + 'Feather').default;
  },
  get FontAwesome() {
    return require(iconPath + 'FontAwesome').default;
  },
  get Foundation() {
    return require(iconPath + 'Foundation').default;
  },
  get Ionicons() {
    return require(iconPath + 'Ionicons').default;
  },
  get MaterialCommunityIcons() {
    return require(iconPath + 'MaterialCommunityIcons').default;
  },
  get MaterialIcons() {
    return require(iconPath + 'MaterialIcons').default;
  },
  get Octicons() {
    return require(iconPath + 'Octicons').default;
  },
  get SimpleLineIcons() {
    return require(iconPath + 'SimpleLineIcons').default;
  },
  get Zocial() {
    return require(iconPath + 'Zocial').default;
  },
  get createIconSet() {
    return createIconSet;
  },
  get createIconSetFromFontello() {
    return createIconSetFromFontello;
  },
  get createIconSetFromIcoMoon() {
    return createIconSetFromIcoMoon;
  },
};
