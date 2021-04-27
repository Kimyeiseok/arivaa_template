import { REGISTER, LOGIN, CHECK_LOGIN, LOGOUT, SAVE_PROFILE } from '../actions';

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = null, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case CHECK_LOGIN:
    //case GET_PROFILE :
    case SAVE_PROFILE:
      let data = action.payload;
      //alert data.stsTokenManager;
      return {
        ...data,
      };
    case LOGOUT:
      return null;
  }
  return state;
}
