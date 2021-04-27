import { Platform } from 'react-native';
export function getImage(uri) {
  if (typeof uri === 'string') {
    return { uri };
  } else {
    return uri;
  }
}
export function isIos() {
  return Platform.OS === 'ios';
}
