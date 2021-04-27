import * as ImagePicker from 'expo-image-picker';

const { launchImageLibraryAsync, launchCameraAsync } = ImagePicker;
export default {
  launchImageLibraryAsync: async (options, props) => {
    try {
      const {
        status: permissionStatus,
      } = await ImagePicker.requestCameraRollPermissionsAsync(); /*checkPermissionStatus(
        Permissions.CAMERA_ROLL
      );*/
      //if (!permissionStatus) {
      if (permissionStatus !== 'granted') {
        console.warn('Permissions for opening camera not present');
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      const result = await launchImageLibraryAsync({
        quality: typeof props.quality !== 'undefined' ? props.quality : 1,
        ...options,
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
  launchCameraAsync: async (options, props) => {
    try {
      // const permissionStatus = await checkPermissionStatus(Permissions.CAMERA);
      // const permissionStatus2 = await checkPermissionStatus(
      //   Permissions.CAMERA_ROLL
      // );
      // if (!permissionStatus && !permissionStatus2) {
      //   console.warn("Permissions for opening gallery not present");
      //   return;
      // }
      const {
        status: permissionStatus,
      } = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionStatus !== 'granted') {
        console.warn('Permissions for opening camera not present');
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      const result = await launchCameraAsync({
        quality: typeof props.quality !== 'undefined' ? props.quality : 1,
        ...options,
      });
      return result;
    } catch (e) {
      throw e;
    }
  },
};
