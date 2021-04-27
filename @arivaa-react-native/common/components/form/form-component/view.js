import React from 'react';
import { Text, View } from 'react-native';
import { List } from '@ant-design/react-native';
import styles from './styles';
import Button from '../../button';
import Input from '../input';
import { ToastComponent } from '../../toast';

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
  const { elements, style, submitTrigger, form, enableModalMode } = this.props;
  const { getFieldDecorator } = form;
  let propStyles = this.props.styles || {};
  let submitBtn = this.props;
  if (typeof submitTrigger !== 'undefined') {
    if (!submitTrigger) {
      submitBtn = null;
    } else {
      const { getTrigger, buttonProps, textProps, text } = submitTrigger;
      /**
       * A function get Trigger can be exposed to get a submit trigger
       * except the button, All the exposed configuration is passed to trigger
       */
      if (typeof getTrigger !== 'undefined' && getTrigger instanceof Function) {
        submitBtn = getTrigger(this.getExposedConfig());
      } else {
        /**
         * Default onPress property not allowed
         * @type {XML}
         */
        submitBtn = (
          <Button
            style={[styles.button, propStyles.submitTrigger]}
            {...buttonProps}
            onClick={this.onSubmit.bind(this)}
          >
            <Text {...textProps}>{text || 'Submit'}</Text>
          </Button>
        );
      }
    }
  } else {
    submitBtn = (
      <Button
        style={[styles.button, propStyles.submitTrigger]}
        onClick={this.onSubmit.bind(this)}
      >
        <Text style={propStyles.submitTriggerText}>{'Submit'}</Text>
      </Button>
    );
  }

  return (
    <List styles={[style, propStyles.listContainer]}>
      {(elements || [...elements]).map((element, index) => {
        /**
         * Supports custom elements
         */
        const {
          type,
          name,
          inputProps,
          after,
          before,
          options,
          customElement,
          containerStyle,
        } = element || {};
        return element ? (
          <View key={index} style={[propStyles.formContainer, containerStyle]}>
            {before}
            {getFieldDecorator(
              name,
              {
                ...options,
                rules: this.modifyRules(options ? options.rules : null),
              } || {}
            )(
              customElement ? (
                customElement
              ) : (
                <Input name={name} type={type} inputProps={inputProps} />
              )
            )}
            {after}
          </View>
        ) : null;
      })}
      {submitBtn}
      {enableModalMode ? (
        <ToastComponent
          ref={(ref) => {
            this.toast = ref;
          }}
        />
      ) : null}
    </List>
  );
};
module.exports = view;
