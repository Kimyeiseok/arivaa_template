import { Component } from 'react';
import ComponentView from './view';
import { Linking } from 'react-native';
import withDependencies, { getDependency } from '../../with-dependencies';

/**
 * @description Go Back
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
   * onPress
   */
  onPress() {
    const { link, onPress, options } = this.props;
    goToExternalLink(link, options);
    if (onPress && onPress instanceof Function) {
      onPress();
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
export function goToExternalLink(link, options) {
  const webBrowser = getDependency('web-browser');
  const fallback = () => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        return Linking.openURL(link);
      } else {
        console.warn("Don't know how to open URI: " + link);
      }
    });
  };
  if (webBrowser && webBrowser.openLink instanceof Function) {
    return webBrowser.openLink(link, options, fallback);
  } else {
    console.warn(
      'No Function for Opening Link found in Dependency web-browser, Falling back to default.'
    );
    return fallback();
  }
}
Main.displayName = 'External-Link';

export default withDependencies(Main);
