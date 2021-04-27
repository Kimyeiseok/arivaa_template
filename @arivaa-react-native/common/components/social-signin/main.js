import { Component } from 'react';
import ComponentView from './view';
import withDependencies from '../with-dependencies';
const supportedTypes = ['facebook', 'google', 'twitter', 'linkedin'];

/**
 * @description Social Sign In Component for various social providers
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
    this.validateType();
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  validateType() {
    if (supportedTypes.indexOf(this.getType()) === -1) {
      throw Error(
        'Unsupported Type value in Social Sign In Component. Supported Types are ' +
          supportedTypes.join(',')
      );
    }
    return true;
  }

  /**
   * Get input type
   * @returns {string}
   */
  getType() {
    const { type } = this.props;
    return (type || '').toLowerCase();
  }

  /**
   * Authenticate
   */
  async authenticate() {
    const type = this.getType();
    const { onSuccess, onError, getDependency } = this.props;
    const SocialAuth = getDependency('social-auth');
    let { clientId, scopes } = this.props;
    if (!clientId) {
      console.warn('Client Id missing for Social Sign in component');
    }
    scopes = scopes || [];
    let config = {
      clientId,
      scopes,
    };
    let result = null;
    try {
      if (SocialAuth[type]) {
        result = await SocialAuth[type](config);
      } else {
        throw new Error('Authentication Type not supported');
      }
      if (result) {
        onSuccess ? onSuccess(result) : null;
      } else {
        throw new Error('Empty response from social provider');
      }
    } catch (e) {
      console.warn('Error while authenticating with social provider ', {
        e,
        type,
      });
      onError ? onError(e) : null;
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
Main.displayName = 'Social-SignIn';
export default withDependencies(Main);
