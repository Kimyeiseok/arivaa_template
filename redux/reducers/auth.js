/**
 * Authentication Reducer
 */

import { REGISTER, LOGIN, LOGOUT } from '../actions';

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = null, action) {
  let data = null;
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      data = action.payload;
      return {
        ...data,
      };
    case LOGOUT:
      return null;
  }
  return state;
}
