import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Colors } from '../../styles/';
import SectionedMultiSelect from '../../external-libs/react-native-sectioned-multi-select';
import { List, Picker } from '@ant-design/react-native';
import Icon from '../icon';
import { isTablet } from 'react-native-device-detection';

var view = function () {
  const { value, fontLoaded } = this.state;
  let {
    title,
    selectToggleIconComponent,
    labelPropName,
    showRemoveAll,
    selectedIconComponent,
    showCancelButton,
    theme,
    themeTextColor,
    onToggle,
    multiple,
    labelFormatter,
    valuePropName,
    itemFontSize,
    submitButtonText,
    modalAnimationType,
    removeAllText,
    renderSelectedItems,
    selectedItemsDisplayCount,
    searchPlaceholderText,
    search,
    onConfirm,
    hideSelect,
    selectInputIconType,
    selectInputIcon,
    selectTogglePropStyles,
  } = this.props;
  let propColors = this.props.colors || {};
  let propStyles = this.props.styles || {};

  switch (this.getType()) {
    case 'picker':
      return (
        <View style={[styles.select, propStyles.selectContainer]}>
          <Picker
            data={this.getData()}
            value={value}
            onOk={this.onChange.bind(this)}
            onChange={this.onChange.bind(this)}
            cols={1}
            itemStyle={[
              styles.itemStyle,
              { color: themeTextColor || propColors.itemText },
              propStyles.item,
            ]}
            indicatorStyle={[styles.indicatorStyle, propStyles.indicator]}
          >
            <List.Item arrow="vertical" style={propStyles.title}>
              <Text
                style={[
                  styles.pickerTitle,
                  { color: theme || propColors.titleText },
                  propStyles.titleText,
                ]}
              >
                {title || 'Select Item'}
              </Text>
            </List.Item>
          </Picker>
        </View>
      );
    case 'modal':
      return fontLoaded ? (
        <View style={[propStyles.selectContainer]}>
          <Icon
            type={selectInputIconType || 'feather'}
            style={[styles.selectInputIcon]}
            name={selectInputIcon || 'check-square'}
          />
          <SectionedMultiSelect
            ref={(ref) => {
              this.multiSelectRef = ref;
            }}
            hideSelect={hideSelect}
            hideSearch={!search}
            items={this.getData()}
            hideTags={true}
            single={!multiple}
            displayKey={labelPropName || 'label'}
            onSelectedItemsChange={this.onChange.bind(this)}
            uniqueKey={valuePropName || 'value'}
            selectedItems={value}
            itemFontSize={itemFontSize || 14}
            selectText={title}
            itemBackground={'red'}
            onConfirm={() => {
              if (onConfirm instanceof Function) {
                onConfirm(this.state.value);
              }
            }}
            labelFormatter={labelFormatter}
            onToggle={onToggle}
            showRemoveAll={showRemoveAll == false ? false : true}
            showCancelButton={!multiple || showCancelButton}
            selectedItemsDisplayCount={selectedItemsDisplayCount || 2}
            modalAnimationType={modalAnimationType || 'fade'}
            searchPlaceholderText={searchPlaceholderText}
            selectedIconComponent={
              selectedIconComponent || (
                <Icon
                  type={'materialIcons'}
                  name={'check'}
                  style={[
                    {
                      color:
                        theme || propColors.selectedIcon || Colors.primaryColor,
                    },
                    propStyles.selectedIcon,
                  ]}
                />
              )
            }
            selectToggleIconComponent={
              selectToggleIconComponent || (
                <Icon
                  type={'materialIcons'}
                  name={'keyboard-arrow-down'}
                  style={[
                    {
                      color:
                        themeTextColor ||
                        propColors.selectToggleIcon ||
                        Colors.primaryColor,
                    },
                    propStyles.selectToggleIcon,
                  ]}
                />
              )
            }
            confirmText={submitButtonText || 'Ok'}
            removeAllText={removeAllText || 'Remove All'}
            renderSelectedItems={renderSelectedItems}
            styles={{
              mainContainer: {},
              scrollView: {
                paddingHorizontal: 0,
              },
              selectorView: {},
              container: {
                top: 10,
              },
              labelParentContainer: {},
              item: {
                paddingHorizontal: 10,
                paddingVertical: 10,
              },
              itemText: {
                color:
                  themeTextColor || propColors.itemText || Colors.brandGrey,
                fontWeight: 'normal',
                fontSize: 14,
              },
              selectedItem: {
                backgroundColor: '#f7f7f7',
              },
              selectedItemText: {
                color:
                  theme || propColors.selectedItemText || Colors.primaryColor,
              },
              separator: {
                backgroundColor: '#e9e9e9',
              },
              button: {
                backgroundColor:
                  theme || propColors.theme || Colors.primaryColor,
                paddingVertical: 12,
              },
              confirmText: {
                fontSize: 14,
                fontWeight: 'normal',
              },
              cancelButton: {
                backgroundColor: propColors.cancelButton || Colors.brandGrey,
              },
              selectToggle: {
                backgroundColor: '#fafafa',
                borderWidth: 1,
                borderColor: Colors.borderColor,
                height: isTablet ? 80 : 50,
                marginBottom: 10,
                marginLeft: 0,
                paddingHorizontal: 15,
                paddingLeft: 55,
                borderRadius: 4,
              },
              selectToggleText: {
                fontSize: isTablet ? 18 : 15,
                fontWeight: 'normal',
                color:
                  theme || propColors.selectToggleText || Colors.primaryColor,
              },
              listContainer: {
                borderColor: 'red',
                borderWidth: 2,
              },
              chipContainer: {
                backgroundColor: '#f7f7f7',
                borderColor: '#e9e9e9',
              },
              chipText: {
                color: theme || propColors.chipText || Colors.primaryColor,
              },
              ...propStyles,
            }}
          />
        </View>
      ) : null;
  }
};
module.exports = view;
