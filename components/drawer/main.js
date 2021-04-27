import { Component } from 'react';
import ComponentView from './view';
import { createAction } from '@arivaa-react/redux';
import preProcess from '../../helpers/preprocess';
import firebase from 'firebase';
import { LOGOUT, UI_SET_PROPERTY } from '../../redux/actions';
/**
 * @description Drawer Panel
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
    this.state = {
      loading: false,
    };
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Logout a user
   */
  logout() {
    const { logout, navigation } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        logout().then(() => {
          setTimeout(() => {
            navigation.navigate('login');
          }, 0);
        });
      });
  }

  /**
   * Functions that are to be passed to drawer items
   * @returns {{logout: (function(this:Main))}}
   */
  getDrawerFunctions() {
    return {
      logout: this.logout.bind(this),
    };
  }
  onPress(item) {
    this.closeDrawer();
    if (this.getDrawerFunctions()[item.onPress] instanceof Function) {
      this.getDrawerFunctions()[item.onPress]();
    }
  }
  /**
   * Close Drawer
   */
  closeDrawer() {
    const { navigation, closeDrawer } = this.props;
    navigation.closeDrawer();
    closeDrawer();
  }

  /**
   * shouldComponentUpdate
   * @param nextProps
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.user) != JSON.stringify(this.props.user);
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
     * Logout Action Creator
     * @param drawerId
     */
    logout: (data) => {
      return dispatch(createAction(LOGOUT, data));
    },
    /**
     * Close Drawer Action Creator
     * to store drawer state
     *
     */
    closeDrawer: () => {
      return dispatch(
        createAction(UI_SET_PROPERTY, {
          name: 'drawer',
          value: false,
        })
      );
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
  return {
    user: state.user,
    //drawer: !!state.ui.drawer
  };
};
Main.displayName = 'Drawer-Panel';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
