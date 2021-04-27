import { createStore } from '@arivaa-react/redux';
import actions from './actions';
import initialState from './initial-state';
import * as reducers from './reducers';
export default () => {
  return createStore({
    reducers: {
      ...reducers,
      config: (state = {}) => state,
      emitter: (state = null) => state,
    },
    actions,
    initialState,
  });
};
