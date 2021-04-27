import { Component } from 'react';
import ComponentView from './view';
import withDependencies from '../with-dependencies';
/**
 * @description Sample Component
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
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Sample-Component';
export default withDependencies(Main);
