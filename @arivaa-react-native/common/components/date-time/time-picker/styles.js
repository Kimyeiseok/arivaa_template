import React, { Platform } from 'react-native';
import { Colors } from '../../../styles/';

var styles = React.StyleSheet.create({
  view: {
    padding: 10,
  },
  itemStyle: {
    fontSize: 14,
    color: '#fff',
  },
  modalContent: {
    backgroundColor: Colors.primaryColor,
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  androidStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
  },
});

export default styles;
