import React from 'react-native';
import { Colors } from '@arivaa-react-native/common/styles';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  content: {
    paddingBottom: 100,
  },
  adMob: {
    marginTop: 10,
  },
  banner: {
    marginBottom: 20,
  },
  item: {
    padding: 18,
    marginBottom: 5,
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  back: {
    paddingLeft: 10,
  },
});

export default styles;
