import { Component } from 'react';
import ComponentView from './view';
import PropTypes from 'prop-types';

/**
 * @description Accordion Component
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
      activeKey: null,
    };
    if (props.defaultActiveKey) {
      this.state.activeKey = props.defaultActiveKey;
    } else if (props.activeKey) {
      this.state.activeKey = props.activeKey;
    } else {
      this.state.activeKey = null;
    }
  }

  /**
   * On Key Change
   * @param key
   */
  onChange(key) {
    // console.log(key);
    const { onShow, onHide, data } = this.props;
    if (key) {
      this.setState({ activeKey: key[0] });
      if (onShow instanceof Function) {
        onShow(key, data[key]);
      }
    } else {
      if (onHide instanceof Function) {
        onHide(key, data[key]);
      }
      this.setState({ activeKey: null });
    }
  }

  /**
   * Component Will Receive Props
   * @param newProps
   */
  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.activeKey !== newProps.activeKey) {
      this.setState({ activeKey: newProps.activeKey });
    }
  }

  /**
   * Get Active key
   * @returns {string|string[]|*|string}
   */
  getActiveKey() {
    return this.state.activeKey;
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Arivaa-Accordion';
Main.propTypes = {
  data: PropTypes.array.isRequired,
  defaultActiveKey: PropTypes.string,
  activeKey: PropTypes.string,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  styles: PropTypes.object,
};
