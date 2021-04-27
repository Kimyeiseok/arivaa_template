import { Component } from 'react';
import ComponentView from './view';

/**
 * @description Elements Component from demos
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
    this.state = {};
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Go to specific component demo
   * @param component
   */
  goToComponent(component) {
    const { navigation, routeName } = this.props;
    navigation.navigate(routeName || 'elementView', component);
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Demo-Elements';
