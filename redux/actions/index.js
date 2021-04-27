import * as api from '../../constants/api';

export const SAMPLE_ACTION = 'SAMPLE_ACTION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORGOT = 'FORGOT';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const REGISTER = 'REGISTER';
export const UI_SET_PROPERTY = 'UI_SET_PROPERTY';
export const UI_DELETE_PROPERTY = 'UI_DELETE_PROPERTY';
export const GET_PROFILE = 'GET_PROFILE';
export const CHECK_DUPLICATE_EMAIL = 'CHECK_DUPLICATE_EMAIL';
export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_ACCOUNT = 'VERIFY_ACCOUNT';
export const SAVE_PROFILE = 'SAVE_PROFILE';
/**
 * Reset is a general action for resetting data
 */
export const RESET = 'RESET';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SAVE_PUSH_TOKEN = 'SAVE_PUSH_TOKEN';
export const RECEIVE_PUSH_NOTIFICATION = 'RECEIVE_PUSH_NOTIFICATION';
/**
 * Actions configuration -
 * All actions are configured here
 * Configuration Schema - {
 *  name - Action Name
 *  type - Type of Action - ajax or normal ->
 *  config - {
 *      url => For Ajax
 *      method => For Ajax
 *      headers => For Ajax
 *      promise => For normal action -> if we want data to be resolved as dummy promise
 *      getData => General -> If we want to customize the data -> Input data is passed as argument
 *      getParams => For Ajax -> If we want to get params out of input data
 *  }
 * }
 * @type {[*]}
 */
export default [
  {
    name: SAMPLE_ACTION,
    config: {
      getData: () => {
        return {
          text: 'Yo this is updated text',
        };
      },
    },
  },
  {
    name: UI_SET_PROPERTY,
  },
  {
    name: UI_DELETE_PROPERTY,
  },
  {
    name: LOGIN,
    config: {
      promise: true,
      getData: (data) => {
        /**
         * Configure analytics
         */

        identifyUser(data.uid, {
          name: data.displayName,
          email: data.email,
        });
        return data;
      },
    },
  },
  {
    name: LOGOUT,
    config: {
      promise: true,
    },
  },
  {
    name: FORGOT,
    type: 'ajax',
    config: {
      url: api.FORGOT,
      method: 'POST',
    },
  },
  {
    name: REGISTER,
    config: {
      promise: true,
    },
  },
  {
    name: CHECK_DUPLICATE_EMAIL,
    type: 'ajax',
    config: {},
  },
  {
    name: GET_PROFILE,
    type: 'ajax',
    config: {
      method: 'GET',
      url: api.GET_PROFILE,
    },
  },
  {
    name: VERIFY_OTP,
    type: 'ajax',
    config: {
      url: api.VERIFY_OTP,
      method: 'POST',
    },
  },
  {
    name: VERIFY_ACCOUNT,
    type: 'ajax',
    config: {},
  },
  {
    name: RESET,
  },
  {
    name: UPLOAD_FILE,
    type: 'ajax',
    config: {},
  },
  {
    name: RESET_PASSWORD,
    type: 'ajax',
    config: {
      url: api.RESET_PASSWORD,
      method: 'POST',
    },
  },
  {
    name: CHANGE_PASSWORD,
    type: 'ajax',
    config: {
      url: api.CHANGE_PASSWORD,
      method: 'POST',
    },
  },
  {
    name: SAVE_PUSH_TOKEN,
    type: 'ajax',
    config: {
      url: api.SAVE_PUSH_TOKEN,
      method: 'POST',
    },
  },
  {
    name: RECEIVE_PUSH_NOTIFICATION,
    type: 'ajax',
    config: {
      url: api.RECEIVE_PUSH_NOTIFICATION,
      method: 'POST',
    },
  },
  {
    name: SAVE_PROFILE,
    config: {
      promise: true,
    },
  },
];
