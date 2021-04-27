import { Permissions } from '@arivaa-react-native/expo/helpers/permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
export const isStandAloneApp = Constants.appOwnership == 'standalone';

/**
 * For complete reference check -
 * https://docs.expo.io/versions/v38.0.0/sdk/permissions/
 * Note - Define permissions in app.json also as on this link
 * @type {[*]}
 */
export const PERMISSIONS = [
  Permissions.CAMERA_ROLL,
  Permissions.CAMERA,
  Permissions.LOCATION,
  Permissions.NOTIFICATIONS,
];
export const TESTING = true;
export const GOOGLE_PLACES_KEY = 'AIzaSyD9Mg0CgGHV_pJx1YLZl2_WyuRYQaSoiUY';
export const SEGMENT = {
  android: 'AWkJz0EskdiKD5QgcsD67BFVVjxIIWh4',
  ios: '3LM1eZ2A7ufsudMSbdGzc08qp0Lyiyt7',
};
export const AD_MOB = {
  androidAppId: 'ca-app-pub-5213082437607074~4492652978',
  iosAppId: 'ca-app-pub-5213082437607074~4041883374',
  adUnits: [
    {
      type: 'banner',
      size: 'fullBanner',
      unitId: 'ca-app-pub-5213082437607074/4452946916',
    },
    {
      type: 'interstitial',
      unitId: 'ca-app-pub-5213082437607074/3244818785',
    },
    {
      type: 'rewarded',
      unitId: 'ca-app-pub-5213082437607074/1455426090',
    },
  ],
  testDeviceID: isStandAloneApp ? 'EMULATOR' : 'EMULATOR', //To be changed to device info
};

export const EXPO_GOOGLE_CLIENT_IDS = [
  '69935791112-29dfkr3n0fhtp7s0k51ctleireu44sqq.apps.googleusercontent.com',
  '69935791112-f29ach1noraci1cv5ben4evobtb1hir7.apps.googleusercontent.com',
];

export const WEBVIEW_URL = 'https://arivaa-firebase.laxaar.com/webview.html';
export const PROFILE_IMAGES_PATH = 'profileImages';
export const firebaseConfig = {
  ...FirebaseCore.DEFAULT_APP_OPTIONS,
  ...(FirebaseCore.DEFAULT_APP_OPTIONS &&
  FirebaseCore.DEFAULT_APP_OPTIONS.projectId &&
  !FirebaseCore.DEFAULT_APP_OPTIONS.authDomain
    ? {
        authDomain: `${FirebaseCore.DEFAULT_APP_OPTIONS.projectId}.firebaseapp.com`,
      }
    : {}),
};
firebase.initializeApp(firebaseConfig);
