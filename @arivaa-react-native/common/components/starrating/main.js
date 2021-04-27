import { Component } from 'react';
import ComponentView from './view';

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
      rating: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {
    const { initialRating: rating } = this.props;
    this.setState({ rating });
  }

  onChange(rating) {
    const { onChange } = this.props;
    this.setState({ rating });
    if (onChange instanceof Function) {
      onChange(rating);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { rating } = this.state;
    if (typeof nextProps.rating === 'number' && nextProps.rating !== rating) {
      this.onChange(nextProps.rating);
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

Main.displayName = 'Star-Rating';
