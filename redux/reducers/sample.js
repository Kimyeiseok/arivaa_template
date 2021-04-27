import { SAMPLE_ACTION } from '../actions';

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {{}}
 */
export default function (state = {}, action) {
  let payload = action.payload;
  switch (action.type) {
    case SAMPLE_ACTION:
      let data = payload;
      return {
        ...data,
      };
  }
  return state;
}
