import React from 'react-native';
import { Colors } from '@arivaa-react-native/common/styles';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const stylesObj = {
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 15,
  },
  logoContainer: {
    ...ifIphoneX(
      {
        marginTop: 70,
      },
      {
        marginTop: 30,
      }
    ),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logo: {
    ...ifIphoneX(
      {
        width: 180,
        height: 180,
      },
      {
        width: 130,
        height: 130,
      }
    ),
    alignSelf: 'center',
  },
  form: {
    alignSelf: 'stretch',
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      {
        paddingTop: 20,
      }
    ),
  },
  list: {
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: Colors.inputBackgroundColor,
  },
  inputIcon: {
    width: 18,
  },
  button: {
    marginBottom: 10,
    borderRadius: 2,
    borderWidth: 0,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: Colors.primaryColor,
    fontSize: 15,
  },
  textLink: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'left',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingBottom: 10,
  },
  separator: {
    height: 40,
    width: 2,
    backgroundColor: '#ff9599',
    marginTop: 8,
  },
  optionLabel: {
    color: '#fff',
  },
  social: {
    flex: 1,
    flexDirection: 'row',
  },
  socialIcon: {
    width: 25,
    marginRight: 10,
  },
  forgotPassword: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
  separatorOr: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  countryCode: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.inputBackgroundColor,
    height: 50,
    marginBottom: 10,
    marginLeft: 0,
    paddingLeft: 15,
    borderBottomWidth: 0,
  },
  countryCodeLabel: {
    color: '#fff',
  },
  githubIcon: {
    fontSize: 28,
    color: '#fff',
    marginTop: 6,
  },
};
var styles = React.StyleSheet.create(stylesObj);
export { stylesObj };

export default styles;
