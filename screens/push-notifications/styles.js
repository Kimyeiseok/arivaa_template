import React from 'react-native';
import { Colors } from '@arivaa-react-native/common/styles';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 40,
  },
  content: {
    paddingBottom: 100,
  },
  pushNotifications: {
    marginTop: 10,
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
    paddingTop: 0,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 8,
  },
  link: {
    marginTop: 10,
  },
  back: {
    paddingLeft: 10,
  },
  request: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#f7f7f7',
  },
  commandText: {
    marginBottom: 10,
  },
  action: {
    marginTop: 20,
  },
  buttonText: {
    backgroundColor: Colors.primaryColor,
    width: 100,
    height: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    paddingTop: 8,
    borderRadius: 4,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  response: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#f7f7f7',
  },
});

export default styles;
