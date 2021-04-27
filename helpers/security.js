/**
 * Security and authentication related helper methods
 */
import axios from 'axios';
import {
  save,
  load,
  remove,
} from '@arivaa-react-native/common/helpers/storage';

const LOGIN_KEY = 'loginData';
/**
 * Save Authentication Data to Local Storage and Set Header
 * @param data
 * @returns {boolean}
 */
export function saveAuthData(data) {
  const { token } = data;
  axios.defaults.headers.common.Authorization = 'Bearer ' + token;
  return save({
    key: LOGIN_KEY,
    value: {
      data: data,
      token: token,
    },
  });
}
/**
 * Get Authentication Data from Local Storage and Set Header
 * @param data
 * @returns {boolean}
 */
export function getAuthData() {
  return load({
    key: LOGIN_KEY,
  }).then((data) => {
    axios.defaults.headers.common.Authorization = 'Bearer ' + data.token;
    return data.data;
  });
}
/**
 * Remove Authentication Data from Local Storage and Set Header
 * @param data
 * @returns {boolean}
 */
export function removeAuthData() {
  axios.defaults.headers.common.Authorization = null;
  return remove(LOGIN_KEY);
}
