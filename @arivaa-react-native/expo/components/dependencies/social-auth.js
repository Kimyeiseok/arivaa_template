import {
  askForPlayServicesAsync,
  initAsync,
  signInAsync,
} from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';
import { logInAsync } from 'expo-google-app-auth';
const isStandaloneApp = Constants.appOwnership === 'standalone';

const supportedTypes = ['facebook', 'google'];

/**
 * Authenticate via Facebook
 */
export async function facebook(config) {
  let { clientId, scopes } = config;
  clientId = clientId || Constants.manifest.facebookAppId;
  console.log({ clientId });
  scopes = scopes || ['public_profile', 'email'];
  let result;
  try {
    await Facebook.initializeAsync({
      appId: clientId,
      appName: Constants.manifest.facebookDisplayName,
    });
    result = await Facebook.logInWithReadPermissionsAsync({
      permissions: scopes,
    });
    if (result && result.type === 'cancel') {
      throw response;
    }
  } catch (e) {
    console.warn('Error in facebook sign in', { e });
    throw e;
  }
  return result;
}

/**
 * Authenticate via Google
 * @param config
 * @returns {Promise<*>}
 */
export async function google(config) {
  let { scopes, clientId } = config;
  clientId = clientId || [];
  scopes = scopes || ['profile', 'email'];
  try {
    if (isStandaloneApp) {
      await initAsync({
        scopes,
      });
      await askForPlayServicesAsync();
      const { type, user } = await signInAsync();
      const { auth } = user || {};
      return {
        ...auth,
        type,
      };
    } else {
      const response = await logInAsync({
        scopes,
        androidClientId: clientId[0],
        iosClientId: clientId[1],
      });
      if (response && response.type === 'cancel') {
        throw response;
      }
      return response;
    }
  } catch (e) {
    console.warn('Error in google sign in', { e });
    throw e;
  }
}
