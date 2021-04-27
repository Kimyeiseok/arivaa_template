import { Component } from 'react';
import ComponentView from './view';

/**
 * @description Input Component
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {
  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Component Will Receive props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.value != nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onChange(value) {
    const { onChangeText, disableTrim } = this.props;
    if (value === undefined) {
      return;
    }
    if (value && !disableTrim) {
      value = value.trim();
    }
    if (this.getType() === 'number') {
      value = parseFloat(value);
    }

    this.setState({ value });
    if (onChangeText instanceof Function) {
      onChangeText(value);
    }
  }

  onSubmit() {
    const { onChange, disableTrim, inputProps } = this.props;
    let { value } = this.state;
    if (value && value.trim && !disableTrim) {
      value = value.trim();
    }
    if (onChange instanceof Function) {
      onChange(value);
    }
  }

  /**
   * Get Icon
   */
  getIcon() {
    let { icon } = this.props;
    if (typeof icon === 'undefined') {
      switch (this.getType()) {
        case 'email':
          return 'envelope';
        case 'password':
          return 'lock';
        case 'phone':
          return 'phone';
        case 'number':
          return 'lock';
        default:
          return null;
      }
    }
    return icon;
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
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

//Neccesary for it to be recognized by form as input
Main.displayType = 'form-input';
