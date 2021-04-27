import { Component } from 'react';
import ComponentView from './view';

/**
 * @description Demo Element Component
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
      scrollEnabled: true,
    };
  }

  setScroll(scrollEnabled) {
    this.setState({
      scrollEnabled,
    });
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

Main.displayName = 'Demo-Element-View';
