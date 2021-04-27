import { Component } from 'react';
import ComponentView from './view';
import {
  getFirstError,
  integerValidator,
  numberValidator,
  showMessage,
} from '../validation';
import { createForm } from 'rc-form';
console.reportErrorsAsExceptions = false;
/**
 * @description Form Component
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
    this.elementRefs = [];
    this.reset = this.reset.bind(this);
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * Modify Rules for async validator bugs
   * https://github.com/yiminghe/async-validator/issues/57
   */
  modifyRules(rules) {
    return (rules || []).map((rule) => {
      let newRule = {
        ...rule,
      };
      switch ((rule.type || '').toLowerCase()) {
        case 'number':
          delete newRule.type;
          return {
            validator: numberValidator,
            ...newRule,
          };
        case 'integer':
          delete newRule.type;
          return {
            validator: integerValidator,
            ...newRule,
          };

        default:
          return rule;
      }
    });
  }

  /**
   * On Submit of form
   */
  onSubmit() {
    return new Promise((resolve, reject) => {
      try {
        const { onSubmit, onError, toast } = this.props;
        const { validateFields } = this.props.form;
        validateFields((errors, values) => {
          if (errors) {
            showMessage(toast || this.toast, getFirstError(errors));
            if (onError) {
              onError(errors);
            }
            resolve({
              errors,
              values,
            });
            return;
          }
          if (onSubmit) {
            onSubmit(values);
          }
          resolve({
            errors,
            values,
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns all the properties and functions
   * exposed to outside components
   */
  getExposedConfig() {
    const { form } = this.props;
    return {
      form,
      submit: this.onSubmit.bind(this),
      reset,
    };
  }

  reset() {
    const { form } = this.props;
    form.resetFields();
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

Main.displayName = 'Form';
export default createForm()(Main);
