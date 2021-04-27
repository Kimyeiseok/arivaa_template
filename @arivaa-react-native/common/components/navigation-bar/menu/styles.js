import React, { Platform } from 'react-native';
import { Colors } from '../../../styles';
import {
  isAndroid,
  isIos,
  isTablet,
  isIphoneX,
} from 'react-native-device-detection';

var styles = React.StyleSheet.create({
  header: {
    height: isIphoneX ? 80 : Platform.OS === 'ios' ? 70 : 50,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    position: 'absolute',
    left: 10,
    top: isIphoneX ? 35 : Platform.OS === 'ios' ? 20 : 4,
    zIndex: 1,
    flexDirection: 'row',
  },
  headerTitle: {
    color: Colors.brandGrey,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerRight: {
    position: 'absolute',
    right: 10,
    top: isIphoneX ? 35 : Platform.OS === 'ios' ? 20 : 4,
    flexDirection: 'row',
  },
  leftLink: {
    marginRight: 2,
    padding: 8,
  },
  rightLink: {
    marginLeft: 2,
    padding: 8,
  },
  content: {
    color: Colors.primaryColor,
    marginTop: 2,
  },
  menuIcon: {
    fontSize: isTablet ? 25 : 22,
    color: '#686f79',
  },
});

export default styles;
