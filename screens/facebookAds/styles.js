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
  facebookAds: {
    marginTop: 10,
  },
  section: {
    marginBottom: 30,
  },
  ad: {
    overflow: 'hidden',
    paddingBottom: 40,
    backgroundColor: '#f7f7f7',
  },
  item: {
    padding: 18,
    marginBottom: 5,
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
  },
  back: {
    paddingLeft: 10,
  },
});

export default styles;
