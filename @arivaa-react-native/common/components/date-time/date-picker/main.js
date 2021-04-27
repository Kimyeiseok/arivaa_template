import { Component } from 'react';
import ComponentView from './view';
import moment from 'moment';
import PropTypes from 'prop-types';

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
    let { value } = props;
    if (!(value instanceof Date)) {
      value = new Date();
    }

    this.state = {
      value: value,
    };
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * onDayChange Hook
   */
  onChange(value) {
    let date;
    if (!value.timestamp) {
      date = value;
    } else {
      date = new Date(value.timestamp);
    }

    this.setState({ value: date });
    const { onChange } = this.props;
    if (onChange instanceof Function) {
      onChange(date);
    }
  }

  /**
   * on change of year
   */

  onYearChange(date) {
    let { value } = this.state;
    value.setFullYear(date.getFullYear());
    this.onChange(value);
  }

  /**
     Get Current value of date according to rnc format
     @param value
     */
  getValue(value) {
    let { theme } = this.props;
    theme = theme || {};
    let dateobj = {};
    dateobj[moment(value).format('YYYY-MM-DD')] = {
      selected: true,
      customStyles: {
        text: {
          color: theme.selectedDayTextColor || '#FFF',
        },
      },
    };
    return dateobj;
  }

  /**
   * Get time string
   */
  getYearString() {
    const { value } = this.state;
    return moment(value).format('YYYY');
  }

  /**
   * componentWillReceiveProps Method
   * @returns {*}
   */

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (nextProps.value !== value) {
      this.setState({ value: nextProps.value });
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

Main.displayName = 'Date-Picker-Component';

Main.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  displayMode: PropTypes.string,
  type: PropTypes.string,
};
