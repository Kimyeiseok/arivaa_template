import React, { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  content: {
    paddingBottom: 100,
  },
  map: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
  },
  mapView: {
    width: width,
    height: height - 100,
    marginTop: 44,
    position: 'absolute',
    zIndex: 1,
  },
  back: {
    paddingLeft: 10,
  },
});

export default styles;
