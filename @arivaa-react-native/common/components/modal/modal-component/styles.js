import React, { Platform, Dimensions } from 'react-native';

var styles = React.StyleSheet.create({
  close: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 0,
    right: 15,
    zIndex: 2,
  },
  closeIcon: {
    color: '#d8d8d8',
    fontSize: 40,
  },
  flexOne: {
    flex: 1,
  },
  modalContent: {
    height: Dimensions.get('window').height,
  },
});

export default styles;
