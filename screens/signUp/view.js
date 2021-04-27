import React from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Link, Form, SocialSignIn, Icon } from '@arivaa-react-native/common';
import logo from '../../assets/logo.png';
import envelope from '../../assets/envelope.png';
import lock from '../../assets/lock.png';
import facebook from '../../assets/facebook.png';
import google from '../../assets/google.png';

import { EXPO_GOOGLE_CLIENT_IDS } from '../../constants/environment';
import CustomWebView from '../../components/CustomWebView';
import twitter from '../../assets/twitter.png';

import Colors from '@arivaa-react-native/common/styles/color';

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
  const { name, email, password, phone } = this.validations;
  const { translate } = this.props;
  const { githubSignIn, twitterSignIn } = this.state;
  const formElements = [
    {
      type: 'text',
      name: 'name',
      inputProps: {
        clear: true,
        placeholder: translate('common.name.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        placeholderTextColor: '#fff',
        styles: {
          input: {
            color: '#fff',
          },
          container: {
            backgroundColor: Colors.inputBackgroundColor,
            borderWidth: 0,
            borderBottomColor: 'transparent',
          },
        },
        children: (
          <Icon
            name={'ios-person'}
            size={25}
            color="#fff"
            style={[styles.userIcon]}
          />
        ),
      },
      options: name,
    },
    {
      type: 'email',
      name: 'email',
      inputProps: {
        clear: true,
        placeholder: translate('common.email.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        styles: {
          input: {
            color: '#fff',
          },
          container: {
            backgroundColor: Colors.inputBackgroundColor,
            borderWidth: 0,
            borderBottomColor: 'transparent',
          },
        },
        placeholderTextColor: '#fff',
        children: (
          <Image
            resizeMode="contain"
            source={envelope}
            style={[styles.inputIcon]}
          />
        ),
      },
      options: email,
    },
    {
      type: 'password',
      name: 'password',
      inputProps: {
        clear: true,
        placeholder: translate('common.password.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        styles: {
          input: {
            color: '#fff',
          },
          container: {
            backgroundColor: Colors.inputBackgroundColor,
            borderWidth: 0,
            borderBottomColor: 'transparent',
          },
        },
        placeholderTextColor: '#fff',
        children: (
          <Image
            resizeMode="contain"
            source={lock}
            style={[styles.inputIcon]}
          />
        ),
      },
      options: password,
    },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'margin'}
      style={[styles.container]}
    >
      <ScrollView>
        <View style={[styles.logoContainer]}>
          <Image resizeMode="contain" source={logo} style={[styles.logo]} />
        </View>
        <KeyboardAvoidingView style={[styles.form]}>
          <Form
            elements={formElements}
            style={{
              Body: styles.list,
            }}
            onSubmit={this.onSubmit.bind(this)}
            submitTrigger={{
              buttonProps: {
                style: styles.button,
              },
              textProps: {
                style: styles.buttonText,
              },
              text: translate('signUp.signUp'),
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={[styles.options]}>
        <View>
          <Text style={[styles.optionLabel]}>{translate('signUp.member')}</Text>
          <Link
            textStyle={[styles.textLink]}
            text={translate('signUp.label')}
            link="login"
          />
        </View>
        <View style={[styles.separator]} />
        <View>
          <Text style={[styles.optionLabel]}>{translate('signUp.social')}</Text>
          <View style={[styles.social]}>
            <SocialSignIn
              type="facebook"
              triggerElement={
                <Link>
                  <Image
                    resizeMode="contain"
                    source={facebook}
                    style={[styles.socialIcon]}
                  />
                </Link>
              }
              onSuccess={(result) => {
                this.handleSocialSignIn('facebook', result);
              }}
              onError={(error) => {
                this.handleSocialSignInError('facebook', error);
              }}
            />
            <SocialSignIn
              clientId={EXPO_GOOGLE_CLIENT_IDS}
              type="google"
              triggerElement={
                <Link>
                  <Image
                    resizeMode="contain"
                    source={google}
                    style={[styles.socialIcon]}
                  />
                </Link>
              }
              onSuccess={(result) => {
                this.handleSocialSignIn('google', result);
              }}
              onError={(error) => {
                this.handleSocialSignInError('google', error);
              }}
            />
            <Link
              onPress={() => {
                this.setState({ twitterSignIn: true });
              }}
            >
              <Image
                resizeMode="contain"
                source={twitter}
                style={[styles.socialIcon]}
              />
            </Link>
            <Link
              onPress={() => {
                this.setState({ githubSignIn: true });
              }}
            >
              <Icon
                type="font-awesome"
                name={'github-square'}
                style={[styles.githubIcon]}
              />
            </Link>
          </View>
        </View>
      </View>
      <CustomWebView
        visible={twitterSignIn}
        scriptId="twitter"
        onSuccess={this.signInWithTwitter.bind(this)}
        onFailMessage={translate('login.fail') + ' twitter'}
        onHide={() => {
          this.setState({ twitterSignIn: false });
        }}
      />
      <CustomWebView
        visible={githubSignIn}
        scriptId="github"
        onSuccess={this.signInWithGithub.bind(this)}
        onFailMessage={translate('login.fail') + ' github'}
        onHide={() => {
          this.setState({ githubSignIn: false });
        }}
      />
    </KeyboardAvoidingView>
  );
};

module.exports = view;
