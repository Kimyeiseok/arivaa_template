import React from 'react-native';
import { Colors } from '@arivaa-react-native/common/styles';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  scrollBox: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  analytics: {
    marginTop: 20,
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
  message: {
    padding: 18,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 8,
  },
  info: {
    color: '#555',
  },
  back: {
    paddingLeft: 10,
  },
});

export default styles;
