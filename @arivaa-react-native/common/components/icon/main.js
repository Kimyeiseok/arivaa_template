import { Component } from 'react';
import ComponentView from './view';
import { camelCaseToDash } from '../util';
import withDependencies from '../with-dependencies';
/**
 * @description Icon Component
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
    this.configureIconSets();
  }

  /**
   * Configure Icon Sets
   */
  configureIconSets() {
    let iconMap = {};
    const { getDependency } = this.props;
    const VectorIcons = getDependency('vector-icons');
    /**
     * Create a map of lowercase keys so that
     * type can be case insensitive
     */
    Object.keys(VectorIcons).map((key) => {
      iconMap[key.toLowerCase()] = VectorIcons[key];
      iconMap[camelCaseToDash(key).toLowerCase()] = VectorIcons[key];
    });
    this.iconMap = iconMap;
  }
  /**
   * Set Native Props
   * @param nativeProps
   */
  setNativeProps(nativeProps) {
    this.iconRef ? this.iconRef.setNativeProps(nativeProps) : null;
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

Main.displayName = 'Icon-Component';
export default withDependencies(Main);
