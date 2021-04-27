import { Component } from 'react';
import ComponentView from './view';

/**
 * @description Loader Component
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
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {
    this.animation.play();
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Loader-Component';
