import React from 'react';
import styles from './styles';
import { View, Platform } from 'react-native';
import { DatePickerView } from '@ant-design/react-native';
import { ModalTrigger } from '../../modal';
import Button from '../../button';

var view = function () {
  const { tempValue } = this.state;
  const { lang } = this.props;
  let propStyles = this.props.styles || {};
  const {
    selectTimeButtonProps,
    yearPickerModalProps,
    doneButtonProps,
    min,
    max,
  } = this.props;

  return (
    <ModalTrigger
      ref={(ref) => {
        this.modalTriggerRef = ref;
      }}
      content={
        <View style={[styles.view, propStyles.yearPickerContainer]}>
          <DatePickerView
            mode="year"
            minDate={this.getYearDate(min)}
            maxDate={this.getYearDate(max)}
            value={tempValue}
            onChange={this.onValueChange.bind(this)}
            itemStyle={[styles.itemStyle, propStyles.yearPickerItem]}
          />
          <Button
            style={[styles.androidStyle, propStyles.yearPickerDoneButton]}
            type="bordered"
            {...doneButtonProps}
            onClick={this.onChange.bind(this)}
            text={lang['year.done.title']}
          />
        </View>
      }
      modalProps={{
        scrollViewProps: { scrollEnabled: false },
        style: [styles.modalContent],
        ...yearPickerModalProps,
        backdrop: true,
        styles: {
          modalContent: {
            paddingTop: Platform.OS === 'ios' ? 20 : 70,
          },
          close: {
            top: 0,
          },
        },
      }}
    >
      <Button
        style={propStyles.yearPickerSelect}
        type="bordered"
        {...selectTimeButtonProps}
        text={this.getYearString() + ' | ' + lang['year.select.title']}
      />
    </ModalTrigger>
  );
};
module.exports = view;
