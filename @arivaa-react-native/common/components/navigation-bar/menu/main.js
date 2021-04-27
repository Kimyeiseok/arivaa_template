import { Component } from 'react';
import ComponentView from './view';
import { withNavigation } from '../../navigation';

/**
 * @description Navigation-Bar-Menu Component
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
   * On Item click
   * @param item
   * @param index
   * @param side
   */
  onItemClick(item, index, side) {
    if (item.action instanceof Function) {
      item.action(item, index, side);
    }
  }

  /**
   * Is Route Active
   * @param link
   * @returns {boolean}
   */
  isActive(link) {
    const { routeName } = this.props.navigation.state;
    return routeName === link;
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

export default withNavigation(Main);
Main.displayName = 'Navigation-Bar-Menu-Component';
