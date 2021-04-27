import React from 'react-native';
import { Colors } from '../../../styles';
import { isTablet, isIphoneX } from 'react-native-device-detection';

var styles = React.StyleSheet.create({
  navigationView: {
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.brandLightGrey,
  },
  active: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: isTablet || isIphoneX ? 25 : 10,
  },
  navigationItem: {
    width: 70,
    alignItems: 'center',
  },
  navigationIcon: {
    color: '#686f79',
    fontSize: isTablet ? 25 : 22,
    fontWeight: 'bold',
  },
  navigationText: {
    color: '#686f79',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default styles;
