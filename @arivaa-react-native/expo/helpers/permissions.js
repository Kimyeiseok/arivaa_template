import * as ExpoPermissions from 'expo-permissions';
import { isIos } from '@arivaa-react-native/common/helpers/common';

/**
 * Check if permission is present
 * @param type
 * @returns {Promise.<*>}
 */
export async function checkPermission(type) {
  const { status } = await ExpoPermissions.getAsync(type);
  return status === 'granted' || (isIos() ? status === 'undetermined' : false);
}
/**
 * Check Permission Status
 */
export async function checkPermissionStatus(permission) {
  let status;
  try {
    status = await checkPermission(permission);
  } catch (e) {
    status = false;
  }
  if (!status) {
    try {
      await askPermission(permission);
      status = true;
    } catch (e) {
      console.warn(e);
    }
  }
  return status;
}

/**
 * Ask for permission
 * @param type
 * @returns {Promise.<*>}
 */
export async function askPermission(type) {
  try {
    return await ExpoPermissions.askAsync(type);
  } catch (e) {
    throw e;
  }
}

/**
 * Check if permission is present
 * @param type
 * @returns {Promise.<*>}
 */
export async function askPermissions(types) {
  types = types || [];
  let promises = [];
  for (let i = 0; i < types.length; i++) {
    promises.push(await askPermission(types[i]));
  }
  return promises;
}

export const Permissions = ExpoPermissions;
