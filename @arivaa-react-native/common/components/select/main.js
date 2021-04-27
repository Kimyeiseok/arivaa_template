import { Component } from 'react';
import ComponentView from './view';

const supportedSelectTypes = ['picker', 'modal'];
/**
 * @description Sample Component
 * @type Component
 * @author Inderdeep
 */

export default class Main extends Component {
  /**
   * Container
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: this.getValue(props),
      fontLoaded: false,
    };
  }

  /**
   * Get Value from Props
   * @param props
   * @returns {*}
   */
  getValue(props) {
    let { value, multiple } = props;
    if (multiple) {
      if (typeof value === 'string') {
        value = [value];
      } else if (value instanceof Array) {
        value = value;
      } else if (!value) {
        value = [];
      } else {
        console.warn(
          'Value should either be string or array for Select in case of multiple mode,Taking as empty array'
        );
        value = [];
      }
    } else {
      value = value ? [value] : [];
      if (value instanceof Array) {
        value = [].concat(value[0]);
      } else {
        value = value ? [value] : [];
      }
    }
    return value;
  }

  /**
   * ComponentDidMount Hook
   */
  async componentDidMount() {
    if (this.getType() === 'modal') {
      try {
        this.setState({
          fontLoaded: true,
        });
      } catch (e) {
        console.warn({ e });
      }
    }
  }

  /**
   * Get type of select
   */
  getType() {
    let { type, multiple } = this.props;
    type = (type || '').toLowerCase();
    if (supportedSelectTypes.indexOf(type) === -1) {
      type = 'modal';
    }
    if (multiple && type === 'picker') {
      console.warn('Multiple Select is not supported in picker, Using modal');
      type = 'modal';
    }
    return type;
  }

  /**
   * componentWillReceiveProps Hook
   */

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    /**
     * This condition is neccesary to cover a scenario
     * in case user did not pass a value property from the begining
     * and the parent component is updated, in that case we get
     * value when selected does not reflect
     * Specially in the case
     * When dropdown is used and parent scroll is implemented.
     */
    if (this.getType() === 'modal') {
      if (this.props.value === undefined && nextProps.value === undefined) {
        return;
      }
    }
    if (JSON.stringify(nextProps.value) !== JSON.stringify(value)) {
      this.setState({ value: this.getValue(nextProps) });
    }
  }

  /**
   * onChange of value
   */

  onChange(value) {
    const { multiple, onChange } = this.props;
    if (!multiple) {
      value = [value[0]];
    }
    this.setState({ value });
    if (onChange instanceof Function) {
      onChange(value);
    }
  }

  /**
   * convert input array into select item object
   */

  getData() {
    let { data, labelPropName, valuePropName } = this.props;
    labelPropName = labelPropName || 'label';
    valuePropName = valuePropName || 'value';
    data = (data || []).map((val, index) => {
      val = val || {};
      if (typeof val === 'string') {
        return {
          key: index,
          label: val,
          value: val,
        };
      } else {
        return {
          key: index,
          label: val[labelPropName],
          value: val[valuePropName],
        };
      }
    });
    return data;
  }

  /**
   * Render Method
   * @returns {*}
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Select-Component';
//
// Main.propTypes = {
//     data: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.array
//     ]),
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.array
//     ]),
//     onChange: PropTypes.func,
//     multiple: PropTypes.bool,
//     type: PropTypes.string
// }
