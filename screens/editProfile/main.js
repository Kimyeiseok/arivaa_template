import { Component } from 'react';
import ComponentView from './view';
import { createAction } from '@arivaa-react/redux';
import preProcess from '../../helpers/preprocess';
import { Toast } from '@arivaa-react-native/common';
import Spinner from '../../components/spinner';
import girl from '../../assets/girl.jpg';
import firebase from 'firebase';
import { uploadImage } from '../../helpers/firebase';
import { parse as parsePhoneNumber, isValidNumber } from 'libphonenumber-js';
import { GET_PROFILE, SAVE_PROFILE } from '../../redux/actions';
import { PROFILE_IMAGES_PATH } from '../../constants/environment';
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
    this.setValidations({});
    this.state = {
      profileImage: null,
      renderRecaptcha: false,
      confirmOtp: false,
      emailChanged: false,
      otpVerificationError: false,
    };
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {
    this.getProfile();
  }

  /**
   * Component will receive props hook
   * @param newProps
   */
  UNSAFE_componentWillReceiveProps(newProps) {}

  /**
   * Set Validations
   */
  setValidations(profile) {
    const { translate } = this.props;

    /**
     * Parse the phone number into the country code and phone number
     * @type {{}}
     */
    const parsedPhone = profile.phoneNumber
      ? parsePhoneNumber(profile.phoneNumber, { extended: true })
      : {};
    this.validations = {
      name: {
        rules: [
          { required: true, message: translate('common.name.error.required') },
        ],
        initialValue: profile.displayName,
      },
      email: {
        rules: [
          {
            required: true,
            message: translate('common.email.error.required'),
          },
          {
            type: 'email',
            message: translate('common.email.error.invalid'),
          },
        ],
        initialValue: profile.email,
      },
      phone: {
        rules: [
          { min: 8, message: translate('common.phone.error.min') },
          { max: 15, message: translate('common.phone.error.max') },
          //  {pattern: "^(0|[1-9][0-9]*)$", message: translate("common.phone.error.invalid")}
        ],
        initialValue: parsedPhone.phone,
      },
      countryCode: {
        /**
         * Adding + is neccesary since we have a list of country codes with + included
         */
        initialValue: parsedPhone.countryCallingCode
          ? ['+' + parsedPhone.countryCallingCode]
          : ['+91'],
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
      },
    };
  }

  /**
   * set profile image in state
   * @param profileImage
   */
  setProfileImage(profileImage, result) {
    this.setState({
      profileImage: profileImage || girl,
      result,
    });
  }

  /**
   * Get profile and set initial values in screen
   */
  async getProfile() {
    const { getProfile, user, auth, translate } = this.props;
    Spinner.start();
    try {
      await getProfile();
      this.setValidations({
        ...auth,
        ...user,
      });
      this.setProfileImage(user.photoURL);
      Spinner.stop();
    } catch (e) {
      console.debug('Error while fetching profile', { e });
      Toast.fail(translate('profile.error'));
    }
    Spinner.stop();
  }

  /**
   * On Submit of form
   * @param errors
   * @param values
   */
  async onSubmit(values) {
    const { user, translate, navigation, saveProfile } = this.props;

    const data = {};
    if (user.displayName !== values.name) {
      data.displayName = values.name;
    }
    values.phone = values.phone || '';
    const phoneNumber = values.countryCode[0].concat(values.phone);
    if (values.phone !== '') {
      if (!isValidNumber(phoneNumber)) {
        Toast.fail(translate('common.phone.error.invalid'));
        return;
      }
    }

    try {
      const promises = [];
      Spinner.start();
      /**
       * Update phone number if changed
       */
      if ((values.phone || '') != '' && user.phoneNumber != phoneNumber) {
        await this.sendSms(phoneNumber);
        await this.waitForOtpVerification();
      }

      /**
       * Change image only if image has been reselected
       */
      if (
        this.state.profileImage !== girl &&
        user.photoURL !== this.state.profileImage
      ) {
        try {
          data.photoURL = await uploadImage(
            this.state.profileImage,
            `${PROFILE_IMAGES_PATH}/${user.uid}.png`
          );
        } catch (e) {
          console.debug('Error while uploading file', { e });
          throw translate('profile.saveImageError');
        }
      }

      if (Object.keys(data).length > 0) {
        promises.push(this.updateProfile(data));
      }

      /**
       * Update email if email is changed
       */
      if (user.email != values.email && this.isEmailEnabled()) {
        const emailCredential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          values.password
        );
        try {
          await firebase
            .auth()
            .signInAndRetrieveDataWithCredential(emailCredential);
        } catch (e) {
          console.debug('Error while authentication', { e });
          throw translate('login.invalid');
        }
        promises.push(this.updateEmail(values.email));
      }
      await Promise.all(promises);
      const newProfile = firebase.auth().currentUser.toJSON();
      await saveProfile(newProfile);
      this.setProfileImage({ photoURL: newProfile.photoURL });
      Spinner.stop();
      Toast.success(translate('profile.success'));
      navigation.navigate('profile');
    } catch (e) {
      console.debug('Error while updating profile ', { e });
      Toast.fail(e);
      Spinner.stop();
    }
    this.setState({ otpVerificationError: false, emailChanged: false });
  }

  /**
   * Update profile
   * @param data
   * @returns {!firebase.Thenable.<*>|*|Promise<R>|Promise.<T>}
   */
  async updateProfile(data) {
    const { translate } = this.props;
    try {
      console.log({ data });
      await firebase.auth().currentUser.updateProfile(data);
    } catch (e) {
      console.debug('Error while updating profile data', { e });
      throw translate('profile.saveError');
    }
  }

  /**
   * Change Image
   * @param result
   */
  changeImage(result) {
    if (!result.cancelled) {
      this.setProfileImage(result.uri, result);
    }
  }

  /**
   * Update Email
   * @param email
   * @returns {!firebase.Promise.<void>|Promise<any>}
   */
  async updateEmail(email) {
    const { translate } = this.props;
    try {
      await firebase.auth().currentUser.updateEmail(email);
    } catch (e) {
      console.debug('Error while updating email', { e });
      if (e.code == 'auth/email-already-in-use') {
        throw translate('signUp.duplicate.email');
      } else {
        throw translate('profile.email.update.error');
      }
    }
  }

  /**
   * Send SMS for verification
   * @param phone
   */
  async sendSms(phone) {
    const { translate } = this.props;
    this.setState({
      phone,
    });
    let result;
    const currentUser = firebase.auth().currentUser;
    try {
      if (!currentUser.phoneNumber) {
        result = await currentUser.linkWithPhoneNumber(
          phone,
          this.recaptchaVerifierRef
        );
      } else {
        result = await firebase
          .auth()
          .signInWithPhoneNumber(phone, this.recaptchaVerifierRef);
      }
      this.setState({
        verificationId: result.verificationId,
        confirmOtp: true,
      });
    } catch (e) {
      console.debug('Error while updating phone number', { e });
      throw translate('login.fail') + ' phone, Please try again';
    }
  }

  /**
   * Verify Otp received
   * @param otp
   */
  async verifyOtp(otp) {
    const { verificationId } = this.state;
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      (otp || '').toString()
    );
    try {
      if (!firebase.auth().currentUser.phoneNumber) {
        await firebase.auth().currentUser.linkWithCredential(credential);
      } else {
        await firebase.auth().currentUser.updatePhoneNumber(credential);
      }
      this.setState({ confirmOtp: false });
    } catch (e) {
      console.log('Error while verifying OTP', { e });
      if (e.code !== 'auth/invalid-verification-code') {
        this.setState({ otpVerificationError: e, confirmOtp: false });
      } else {
        throw e;
      }
    }
  }

  async waitForOtpVerification() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.state.otpVerificationError) {
          clearInterval(interval);
          this.setState({ confirmOtp: false });
          if (
            this.state.otpVerificationError.code ===
            'auth/credential-already-in-use'
          ) {
            reject(this.props.translate('common.phone.error.linked'));
          } else {
            reject(this.props.translate('login.fail') + ' this phone number');
          }
        } else if (this.state.confirmOtp === false) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }

  isEmailEnabled() {
    const { user } = this.props;
    return (
      user &&
      !!(user.providerData || []).find(({ providerId }) => {
        return providerId === 'password';
      })
    );
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
    saveProfile: (data) => {
      return dispatch(createAction(SAVE_PROFILE, data));
    },
    /**
     * Save Profile Action Creator
     * @param drawerId
     */
    getProfile: (data) => {
      return dispatch(createAction(GET_PROFILE, data));
    },
  };
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
Main.displayName = 'Edit-Profile';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
