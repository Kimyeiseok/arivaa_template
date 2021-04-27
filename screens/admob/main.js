import { Component } from 'react';

import ComponentView from './view';
import preProcess from '../../helpers/preprocess';
import { AD_MOB as Admob } from '../../constants/environment';
import {
  AdMobInterstitial,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import spinner from '../../components/spinner';
class Main extends Component {
  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTestDeviceIDAsync(Admob.testDeviceID);
  }

  /**
   * On Admob event
   */
  adMobEvent() {
    console.log('Admob event fired');
  }

  /**
   * On error
   */
  bannerError() {
    console.log('Banner Error');
  }

  /**
   * Show a interstitial Ad
   * @param ad
   */
  async showInterstitialAd(ad) {
    spinner.start();
    try {
      AdMobInterstitial.setAdUnitID(ad.unitId);
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    } catch (e) {
      console.log('Error while displaying Interstitial Ad', { e });
    }
    spinner.stop();
  }

  /**
   * Show a rewarded Ad
   * @param ad
   */
  async showRewardedAd(ad) {
    try {
      spinner.start();
      AdMobRewarded.setAdUnitID(ad.unitId);
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    } catch (e) {
      console.log('Error while displaying Interstitial Ad', { e });
    }
    spinner.stop();
  }

  /**
   * Render method
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
Main.displayName = 'Abmob';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});
