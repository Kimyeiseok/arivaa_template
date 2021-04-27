import React from 'react';
import styles, { stylesObj } from './styles';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
  LinkBack,
  Image,
  Form,
  ImagePicker,
  Modal,
  CountryCodePicker,
  Icon,
} from '@arivaa-react-native/common';

import { firebaseConfig } from '../../constants/environment';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Colors from '@arivaa-react-native/common/styles/color';
//import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";
const InputItemStyle = {}; // To do jo
var view = function () {
  const { name, email, phone, countryCode, password } = this.validations;
  const { translate } = this.props;
  const { profileImage, confirmOtp, renderRecaptcha } = this.state;
  const enableEmail = this.isEmailEnabled();
  const formElements = [
    {
      type: 'text',
      name: 'name',
      inputProps: {
        clear: true,
        placeholder: translate('common.name.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        styles: {
          ...InputItemStyle,
          input: {
            ...InputItemStyle.input,
            fontSize: 14,
          },
        },
        placeholderTextColor: '#555',
        children: (
          <Icon
            type="feather"
            name={'user'}
            size={20}
            style={[styles.inputIcon]}
          />
        ),
      },
      before: (
        <Text style={[styles.fieldLabel]}>
          {translate('common.name.title')} *
        </Text>
      ),
      options: name,
    },
    ...(enableEmail
      ? [
          {
            type: 'email',
            name: 'email',
            inputProps: {
              clear: true,
              placeholder: translate('common.email.placeholder'),
              labelNumber: 1.5,
              style: [styles.input],
              styles: {
                ...InputItemStyle,
                input: {
                  ...InputItemStyle.input,
                  fontSize: 14,
                },
              },
              placeholderTextColor: '#555',
              children: (
                <Icon
                  type="feather"
                  name={'mail'}
                  size={20}
                  style={[styles.inputIcon]}
                />
              ),
              onBlur: () => {
                this.setState({ emailChanged: true });
              },
            },
            before: (
              <Text style={[styles.fieldLabel]}>
                {translate('profile.email.title')} *
              </Text>
            ),
            options: email,
          },
        ]
      : []),
    ...(this.state.emailChanged
      ? [
          {
            type: 'password',
            name: 'password',
            inputProps: {
              clear: true,
              placeholder: translate('common.password.placeholder'),
              labelNumber: 1.5,
              style: [styles.input],
              styles: {
                ...InputItemStyle,
                input: {
                  ...InputItemStyle.input,
                  fontSize: 14,
                },
              },
              placeholderTextColor: '#555',
              children: (
                <Icon
                  type="feather"
                  name={'lock'}
                  size={20}
                  style={[styles.inputIcon]}
                />
              ),
            },
            before: (
              <Text style={[styles.fieldLabel]}>
                {translate('common.password.title')} *
              </Text>
            ),
            options: password,
          },
        ]
      : []),
    {
      name: 'countryCode',
      customElement: (
        <CountryCodePicker
          style={{
            value: stylesObj.countryCodeValue,
            listItem: stylesObj.countryCode,
          }}
          styles={{
            selectToggle: {
              borderColor: Colors.borderColor,
              borderWidth: 1,
              backgroundColor: '#fafafa',
              height: 50,
              marginBottom: 10,
              marginLeft: 0,
              paddingHorizontal: 15,
              borderRadius: 4,
            },
          }}
        />
      ),
      before: (
        <Text style={[styles.fieldLabel]}>
          {translate('common.countryCode.title')}
        </Text>
      ),
      options: countryCode,
    },
    {
      type: 'phone',
      name: 'phone',
      inputProps: {
        clear: true,
        placeholder: translate('common.phone.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        styles: {
          ...InputItemStyle,
          input: {
            ...InputItemStyle.input,
            fontSize: 14,
          },
        },
        placeholderTextColor: '#555',
        children: (
          <Icon
            type="feather"
            name={'phone'}
            size={20}
            style={[styles.inputIcon]}
          />
        ),
      },
      before: (
        <Text style={[styles.fieldLabel]}>{translate('profile.phone')}</Text>
      ),
      options: phone,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'margin'}
      style={[styles.container]}
    >
      <View style={[styles.back]}>
        <LinkBack />
      </View>
      <ScrollView>
        <View style={[styles.form]}>
          <View style={[styles.imageBox]}>
            <Image source={profileImage} style={[styles.image]} />
            <ImagePicker onImageSelected={this.changeImage.bind(this)}>
              <View style={[styles.changeImageLink]}>
                <Text style={[styles.text]}>
                  <Icon type="ionicons" name="md-create" />{' '}
                  {translate('profile.changeImage')}
                </Text>
              </View>
            </ImagePicker>
          </View>
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
              text: translate('profile.save'),
            }}
          />
        </View>
      </ScrollView>
      <Modal
        contentProps={{ onVerify: this.verifyOtp.bind(this) }}
        modalId="verification"
        visible={confirmOtp}
      />
      <FirebaseRecaptchaVerifierModal
        ref={(ref) => {
          this.recaptchaVerifierRef = ref;
        }}
        firebaseConfig={firebaseConfig}
      />
    </KeyboardAvoidingView>
  );
};
module.exports = view;
