import { UI_DELETE_PROPERTY, UI_SET_PROPERTY } from '../actions';

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = {}, action) {
  let output = null;
  const payload = action.payload;
  switch (action.type) {
    case UI_SET_PROPERTY:
      output = Object.assign({}, state);
      output[payload.name] = payload.value;
      return output;
    case UI_DELETE_PROPERTY:
      output = Object.assign({}, state);
      delete output[payload.name];
      return output;
  }
  return state;
}
