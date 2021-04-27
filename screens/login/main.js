import { Component } from 'react';
import ComponentView from './view';

import preProcess from '../../helpers/preprocess';
import { Toast } from '@arivaa-react-native/common';
import Spinner from '../../components/spinner';
import firebase from 'firebase';

import { isValidNumber } from 'libphonenumber-js';

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
    this.state = {
      phoneSignIn: false,
      confirmOtp: false,
      renderRecaptcha: false,
    };
    this.setValidations();
    this.login = login.bind(this);
    this.handleSocialSignIn = handleSocialSignIn.bind(this);
    this.signInWithTwitter = signInWithTwitter.bind(this);
    this.signInWithGithub = signInWithGithub.bind(this);
    this.handleSocialSignInError = handleSocialSignInError.bind(this);
    this.sendSms = this.sendSms.bind(this);
  }

  /**
   * Set Validations
   */
  setValidations() {
    const { translate } = this.props;
    this.validations = {
      email: {
        rules: [
          { required: true, message: translate('common.email.error.required') },
          { type: 'email', message: translate('common.email.error.invalid') },
        ],
        initialValue: 'demo@laxaar.com',
      },
      password: {
        rules: [
          {
            required: true,
            message: translate('common.password.error.required'),
          },
          {
            min: 6,
            message: translate('common.passwordLength.error.required'),
          },
        ],
        initialValue: '123456',
      },
      phone: {
        rules: [
          { required: true, message: translate('common.phone.error.required') },
          { min: 8, message: translate('common.phone.error.min') },
          { max: 15, message: translate('common.phone.error.max') },
          // { pattern: "^(0|[1-9][0-9]*)$", message: translate("common.phone.error.invalid") }
        ],
        initialValue: '9887777777',
      },
      countryCode: {
        rules: [
          {
            required: true,
            message: translate('login.countryCode.error.required'),
          },
        ],
        initialValue: ['+91'],
      },
    };
  }

  /**
   * Enable Phone Sign In
   */
  togglePhoneSignIn() {
    this.setState({
      phoneSignIn: !this.state.phoneSignIn,
    });
  }

  /**
   * Send SMS for verification
   * @param phone
   */
  async sendSms() {
    const { translate } = this.props;
    const { phone } = this.state;
    Spinner.start();
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phone,
        this.recaptchaVerifierRef
      );
      this.setState(
        {
          verificationId: verificationId,
          confirmOtp: true,
        },
        Spinner.stop
      );
    } catch (e) {
      console.log({ e });
      Spinner.stop();
      //Todo : Handle specific error codes for invalid phone number and invalid captcha
      Toast.fail(translate('login.fail') + ' phone, Please try again', 0.5);
    }
  }

  /**
   * Verify Otp
   * @param otp
   */
  verifyOtp(otp) {
    return this.login('phone', {
      code: otp,
      verificationId: this.state.verificationId,
    });
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * On Submit of form
   * @param errors
   * @param values
   */
  onSubmit(values) {
    const { translate } = this.props;
    if (this.state.phoneSignIn) {
      const phone = values.countryCode[0].concat(values.phone);
      if (isValidNumber(phone)) {
        this.setState(
          {
            phone,
          },
          this.sendSms
        );
      } else {
        Toast.fail(translate('common.phone.error.invalid'), 0.5);
      }
    } else {
      this.login('local', values);
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
  return {};
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
Main.displayName = 'Login';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});

/**
 * Export common login methods to be
 * used in signup
 */
/**
 * Login
 * @param provider - provider type
 * @param credentials - credentials
 */
export function login(provider, credentials) {
  const { translate } = this.props;
  let promise = null;
  let credential = null;
  Spinner.start();
  switch (provider) {
    case 'local':
      promise = firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      break;
    case 'phone':
      credential = firebase.auth.PhoneAuthProvider.credential(
        credentials.verificationId,
        (credentials.code || '').toString()
      );
      promise = firebase.auth().signInWithCredential(credential);
      break;
    case 'facebook':
      credential = firebase.auth.FacebookAuthProvider.credential(
        credentials.token
      );
      promise = firebase.auth().signInWithCredential(credential);
      break;
    case 'google':
      credential = firebase.auth.GoogleAuthProvider.credential(
        credentials.idToken,
        credentials.accessToken
      );
      promise = firebase.auth().signInWithCredential(credential);
      break;
    case 'twitter':
      credential = firebase.auth.TwitterAuthProvider.credential(
        credentials.token,
        credentials.secret
      );
      promise = firebase.auth().signInWithCredential(credential);
      break;
    case 'github':
      credential = firebase.auth.GithubAuthProvider.credential(credentials);
      promise = firebase.auth().signInWithCredential(credential);
      break;
  }
  if (promise) {
    return promise
      .then((response) => {
        Spinner.stop();
      })
      .catch((e) => {
        Spinner.stop();
        console.log(JSON.stringify(e));
        switch (provider) {
          case 'local':
            Toast.fail(translate('login.invalid'), 0.5);
            break;
          case 'phone':
            /**
             * Throw here so that verification modal can show error
             */
            throw e;
            break;
          case 'facebook':
            Toast.fail(
              translate('login.fail') + ' Facebook\n' + 'Reason : ' + e.message,
              0.5
            );
            break;
          case 'google':
            Toast.fail(
              translate('login.fail') + ' Google\n' + 'Reason : ' + e.message,
              0.5
            );
            break;
          case 'twitter':
            Toast.fail(
              translate('login.fail') + ' Twitter\n' + 'Reason : ' + e.message,
              0.5
            );
            break;
          case 'github':
            Toast.fail(
              translate('login.fail') + ' Github\nReason:' + '+e.message',
              0.5
            );
            break;
        }
      });
  }
}
/**
 * Handle Social Signin
 * @param provider - provider e.g facebook or google
 * @param result - Response
 */
export function handleSocialSignIn(provider, result) {
  this.login(provider, result);
}

/**
 * Handle Error for social signin
 * @param provider - provider e.g facebook or google
 * @param error
 */
export function handleSocialSignInError(provider, error) {
  const { translate } = this.props;
  console.log({ error });
  Toast.fail(translate('login.fail') + provider);
}

/**
 * Sign In with twitter
 *  @param response
 */
export function signInWithTwitter(response) {
  this.setState({
    twitterSignIn: false,
  });
  this.login('twitter', JSON.parse(response));
}
/**
 * Sign In with Github
 *  @param response
 */
export function signInWithGithub(response) {
  this.setState({
    githubSignIn: false,
  });
  this.login('github', response);
}
