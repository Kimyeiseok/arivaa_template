import { Component } from 'react';
import ComponentView from './view';
import { createAction } from '@arivaa-react/redux';
import preProcess from '../../helpers/preprocess';
import { GET_PROFILE, UI_SET_PROPERTY } from '../../redux/actions';
/**
 * @description Header With Menu
 * @type Container
 * @author Inderdeep
 */
class Main extends Component {
  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {
    this.props.getProfile();
  }

  /**
   * Open Drawer
   */
  openDrawer() {
    const { navigation, openDrawer } = this.props;
    navigation.openDrawer();
    openDrawer();
  }

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
  return {
    /**
     * Save Profile Action Creator
     * @param drawerId
     */
    getProfile: (data) => {
      return dispatch(createAction(GET_PROFILE, data));
    },
    /**
     * Open Drawer Action Creator
     * to store drawer state
     *
     */
    openDrawer: () => {
      return dispatch(
        createAction(UI_SET_PROPERTY, {
          name: 'drawer',
          value: true,
        })
      );
    },
  };
};
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
  return {};
};
Main.displayName = 'Header-With-Menu';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
