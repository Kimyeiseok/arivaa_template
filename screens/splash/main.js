import { Component } from 'react';
import ComponentView from './view';
import { createAction } from '@arivaa-react/redux';
import { LOGIN, SAVE_PUSH_TOKEN } from '../../redux/actions';
import preProcess from '../../helpers/preprocess';
import { Toast } from '@arivaa-react-native/common';
import Spinner from '../../components/spinner';
import { createForm } from 'rc-form';
import { load, save } from '@arivaa-react-native/common/helpers/storage';
import firebase from 'firebase';
import {
  getExpoPushServerToken,
  addListener,
} from '@arivaa-react-native/expo/helpers/notifications';

/**
 * @description Login Container
 * @type Container
 * @author Inderdeep
 */
class Main extends Component {
  /**
   * Container
   * @param props
   */
  constructor(props) {
    super(props);
    this.radio_props = [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
    ];
    addListener(this.handleNotification.bind(this));
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {
    const { setActiveLanguage } = this.props;
    load({
      key: 'LANGUAGE',
    })
      .then((language) => {
        let selectedIndex = 0;
        this.radio_props.map((lang, index) => {
          if (lang.value == language) {
            selectedIndex = index;
          }
        });
        this.refs.radioForm.updateIsActiveIndex(selectedIndex);
        setActiveLanguage(this.radio_props[selectedIndex].value);
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(this.checkLogin.bind(this), 500);
  }

  componentWillUnmount() {}

  /**
   * Check login
   */
  checkLogin() {
    const { navigation, login, translate } = this.props;
    onAuthChanged((user) => {
      if (user) {
        login(firebase.auth().currentUser.toJSON()).then(() => {
          setTimeout(() => {
            user = firebase.auth().currentUser.toJSON();
            this.savePushToken(user.uid);
            /**
             * Changed it to secured because
             * due to nested navigators, if i redirect to
             * default INITIAL_SECURED_ROUTE, it loads the
             * screen twice
             * Reference -
             * https://github.com/react-navigation/react-navigation/issues/2599
             * Comment by javidjamae
             */

            navigation.navigate('secured');
            Spinner.stop();
            Toast.success(translate('login.success'), 0.5);
          });
        });
      } else {
        // No user is signed in.
        Spinner.stop();
      }
    });
  }

  /**
   * Save Push Token
   * @param uid
   * @returns {Promise.<void>}
   */
  async savePushToken(uid) {
    const { savePushToken } = this.props;
    try {
      const pushToken = await getExpoPushServerToken();
      await savePushToken({
        uid,
        pushToken,
      });
    } catch (e) {
      console.warn('Error while saving push token ', e);
    }
  }

  /**
   * Switch language
   * @param value
   */
  switchLanguage(language) {
    language = language.value || language;
    const { setActiveLanguage } = this.props;
    save({
      key: 'LANGUAGE',
      value: language,
    });
    setActiveLanguage(language);
  }

  /**
   * Handle Notification
   * @param notification
   * @returns {Promise.<void>}
   */
  async handleNotification(notification) {
    const { origin } = notification;
    const { navigation } = this.props;
    /**
     * origin=="selected" means notification clicked
     *
     */
    if (origin == 'selected') {
      navigation.navigate('pushNotifications', {
        notification,
      });
    }
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
     * Login Action Creator
     * @param drawerId
     */
    login: (data) => {
      return dispatch(createAction(LOGIN, data));
    },
    /**
     * savePushToken Action Creator
     * @param drawerId
     */
    savePushToken: (data) => {
      return dispatch(createAction(SAVE_PUSH_TOKEN, data));
    },
  };
};
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};
Main.displayName = 'Splash';
export default preProcess(createForm()(Main), {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
/**
 * This is done in order to avoid registering
 * multiple callbacks on Auth Changed
 * It results in call of multiple callbacks
 * @param callback
 */
let onAuthChangedUnsubscribe = null;
function onAuthChanged(callback) {
  onAuthChangedUnsubscribe ? onAuthChangedUnsubscribe() : null;
  onAuthChangedUnsubscribe = firebase.auth().onAuthStateChanged(callback);
}
