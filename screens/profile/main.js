import { Component } from 'react';
import ComponentView from './view';

import preProcess from '../../helpers/preprocess';

/**
 * @description profile container
 * @type Component
 * @author Inderdeep
 */
class Main extends Component {
  /**
   * Container
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch) => {
  return {};
};
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
  const { auth, user } = state;
  return {
    auth,
    user,
  };
};
Main.displayName = 'Profile';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
