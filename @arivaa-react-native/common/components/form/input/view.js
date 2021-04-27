import React from 'react';

import styles from './styles';
import { InputItem } from '@ant-design/react-native';
import Icon from '../../icon';
import InputItemStyle from '@ant-design/react-native/lib/input-item/style';
import { getModifiedProps } from '../../util';
import Textarea from 'react-native-textarea';

import { Colors } from '../../../styles';

const iconMap = {
  email: {
    type: 'feather',
    icon: 'mail',
  },
  password: {
    type: 'feather',
    icon: 'lock',
  },
  number: {
    type: 'feather',
    icon: 'smartphone',
  },
  phone: {
    type: 'feather',
    icon: 'phone',
  },
  bankCard: {
    type: 'feather',
    icon: 'credit-card',
  },
  default: {
    type: 'feather',
    icon: 'edit-2',
  },
};
/**
 * JSX View
 * @returns {XML}
 */
var view = function () {
  const { keyboardType, placeholder } = this.props;
  let { inputProps } = this.props;
  let { style } = this.props;
  style = style || {};
  inputProps = inputProps || {};
  let propStyles = {
    ...this.props.styles,
    ...inputProps.styles,
  };
  //For backward compatibility merge this.props and inputProps
  const { icon, iconType, onBlur, onSubmitEditing } = inputProps;
  let input = null;
  inputProps = {
    labelNumber: 1.5,
    placeholder: placeholder,
    ...inputProps,
    ...getModifiedProps(this.props, [
      'icon',
      'iconType',
      'keyboardType',
      'name',
      'type',
    ]),
    onChange: this.onChange.bind(this),
    onSubmitEditing: (e) => {
      this.onSubmit(e);
      if (onSubmitEditing instanceof Function) {
        onSubmitEditing.apply(this, arguments);
      }
    },
    onBlur: (e) => {
      this.onSubmit(e);
      if (onBlur instanceof Function) {
        onBlur.apply(this, arguments);
      }
    },
    value: this.state.value,
  };
  /**
   * Style Logic -
   * Direct style will passed will apply as it is is
   * to input styles
   * In styles - icon will apply to icon
   * input will apply to direct text input inside inputitem
   * @type {[*]}
   */
  inputProps.style = [styles.input, style, inputProps.style];
  inputProps.styles = {
    ...InputItemStyle,
    input: {
      ...InputItemStyle.input,
      fontSize: 15,
      ...propStyles.input,
    },
    container: {
      borderWidth: 1,
      borderColor: Colors.borderColor,
      backgroundColor: '#fafafa',
      height: 50,
      paddingRight: 0,
      marginBottom: 10,
      borderRadius: 4,
      marginLeft: 0,
      paddingLeft: 20,
      outline: 0,
      ...styles.container,
      ...propStyles.container,
    },
  };
  const iconStyle = [styles.inputIcon, propStyles.icon];
  const iconObj = iconMap[this.getType() || 'default'];
  const iconElement =
    icon === false
      ? null
      : inputProps.children || (
          <Icon
            type={iconType || iconObj.type}
            style={iconStyle}
            name={icon || iconObj.icon}
          />
        );
  switch (this.getType()) {
    case 'textarea':
      delete inputProps.styles;
      delete inputProps.onChange;
      input = (
        <Textarea
          keyboardType={keyboardType || 'email-address'}
          {...inputProps}
          onChangeText={this.onChange.bind(this)}
        />
      );
      break;
    case 'email':
      input = (
        <InputItem
          type="email-address"
          //keyboardType={keyboardType || 'email-address'}
          {...inputProps}
        >
          {iconElement}
        </InputItem>
      );
      break;
    case 'password':
      input = (
        <InputItem
          containerStyle={{ borderBottomColor: 'red' }}
          type="password"
          {...inputProps}
        >
          {iconElement}
        </InputItem>
      );
      break;
    case 'number':
      input = (
        <InputItem type="number" {...inputProps}>
          {iconElement}
        </InputItem>
      );
      break;
    case 'phone':
      input = (
        <InputItem type="phone" {...inputProps}>
          {iconElement}
        </InputItem>
      );
      break;
    case 'bankCard':
      input = (
        <InputItem type="bankCard" {...inputProps}>
          {iconElement}
        </InputItem>
      );
      break;
    default:
      input = (
        <InputItem keyboardType={keyboardType || 'default'} {...inputProps}>
          {iconElement}
        </InputItem>
      );
      break;
  }
  return input;
};
module.exports = view;
