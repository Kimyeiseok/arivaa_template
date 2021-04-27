import React from 'react-native';
import { Colors } from '../../styles/';

var styles = React.StyleSheet.create({
  stringStyle: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  multiSliderContainer: {
    paddingLeft: 10,
  },
  markerStyle: {
    width: 20,
    height: 20,
    marginBottom: -2,
  },
  thumb: {
    width: 20,
    height: 20,
    marginBottom: -4,
  },
  track: {
    height: 4,
  },
  multiSlider: {
    paddingLeft: 15,
  },
});

export default styles;
