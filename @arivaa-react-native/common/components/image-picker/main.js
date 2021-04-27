import { Component } from 'react';
import ComponentView from './view';

import { isIos } from '../util';

import withDependencies from '../with-dependencies';
/**
 * @description Image Picker
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
    this.state = {
      value: props.value || null,
    };
    this.imagePicker = props.getDependency('image-picker');
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * componentWillReceiveProps Hook
   */

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (this.props.value === undefined && nextProps.value === undefined) {
      return;
    }

    if (JSON.stringify(nextProps.value) !== JSON.stringify(value)) {
      this.setState({ value: nextProps.value });
    }
  }

  /**
   * Open Camera
   */
  async openCamera() {
    try {
      let result = await this.imagePicker.launchCameraAsync(
        {
          base64: this.isBase64Enabled(),
          ...this.props.launchCameraOptions,
        },
        this.props
      );
      this.onImageSelected(result);
    } catch (e) {
      console.warn('Error while selecting image from camera ', { e });
      throw e;
    }
  }

  /**
   * Open gallery
   */
  async openGallery() {
    try {
      let result = await this.imagePicker.launchImageLibraryAsync(
        {
          mediaTypes: 'Images',
          base64: this.isBase64Enabled(),
          ...this.props.launchGalleryOptions,
        },
        this.props
      );
      this.onImageSelected(result);
    } catch (e) {
      console.warn('Error while selecting image from gallery ', { e });
      throw e;
    }
  }

  isBase64Enabled() {
    const { enableBase64Android, disableBase64Ios } = this.props;
    return isIos() ? !disableBase64Ios : enableBase64Android === true;
  }

  /**
   * On Image Selected
   * @param result
   */
  onImageSelected(result) {
    this.modal.hideModal();
    const { onImageSelected } = this.props;
    try {
      if (result && !result.cancelled) {
        if (isIos()) {
          result.base64Image = 'data:image/png;base64,' + result.base64;
          result.fileUri = result.base64Image;

          this.setState({ value: result.base64Image });
        } else {
          if (this.isBase64Enabled() && result.base64) {
            result.base64Image = 'data:image/png;base64,' + result.base64;
          }
          result.fileUri = result.uri;
          this.setState({ value: result.uri });
        }
        this.executeOnChange(result);
      }
      //To be removed in future
      onImageSelected instanceof Function && onImageSelected(result);
    } catch (e) {
      console.warn({ e });
    }
  }

  /**
   * Execute on change
   * @param result
   */
  executeOnChange(result) {
    const { onChange } = this.props;
    if (onChange && onChange instanceof Function) {
      onChange(result);
    }
  }

  /**
   * On Cancel
   */
  onCancel() {
    this.modal.hideModal();
    const { onCancel } = this.props;
    onCancel ? onCancel() : null;
  }

  /**
   * Get URIO
   */
  getUri() {
    const { value } = this.state;
    return value;
  }

  /**
   * Execute on change
   */
  clearFile() {
    this.setState({
      value: null,
    });
    this.executeOnChange(null);
  }

  /**
   * Configuration to be exposed to outside
   * @returns {{getUri: (function(this:Main)), clearFiles: (function(this:Main))}}
   */
  getExposedConfig() {
    return {
      getUri: this.getUri.bind(this),
      clearFile: this.clearFile.bind(this),
    };
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Image-Picker';
export default withDependencies(Main);
