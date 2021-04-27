import React from 'react-native';
import { Colors } from '../../styles/';
import { isTablet } from 'react-native-device-detection';

var styles = React.StyleSheet.create({
  itemStyle: {
    fontSize: 15,
  },
  select: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  selectInputIcon: {
    color: Colors.primaryColor,
    fontSize: isTablet ? 28 : 20,
    top: isTablet ? 25 : 15,
    left: 22,
    position: 'absolute',
    zIndex: 99,
  },
  pickerTitle: {
    fontSize: 14,
    color: Colors.primaryColor,
  },
});

export default styles;
