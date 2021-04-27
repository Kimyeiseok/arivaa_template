import React from 'react';
import styles from './styles';
import { ScrollView, Text, View } from 'react-native';
import {
  LinkBack,
  Button,
  ClicktoCopy,
  Toast,
} from '@arivaa-react-native/common';

var view = function () {
  const { translate } = this.props;
  const { token, notification } = this.state;

  return (
    <View style={[styles.container]}>
      <View style={[styles.back]}>
        <LinkBack />
      </View>
      <ScrollView>
        <View style={[styles.content]}>
          <View style={[styles.pushNotifications]}>
            <View style={[styles.message]}>
              <Text style={[styles.label]}>Please Note</Text>
              <Text style={[styles.info]}>
                You will have to exit from the app since notifications are only
                shown when app is backgrounded
              </Text>
            </View>
            <View style={[styles.item]}>
              <Button onClick={this.scheduleLocalNotification.bind(this)}>
                <Text style={[styles.text]}>
                  Local Notification - Notify after 5 seconds
                </Text>
              </Button>
            </View>
            <View style={[styles.item]}>
              <Button onClick={this.registerForExpoNotification.bind(this)}>
                <Text style={[styles.text]}>
                  Receive Notification via expo (Will only work on real device)
                </Text>
              </Button>
              {token ? (
                <View style={[styles.request]}>
                  <View style={[styles.curl]}>
                    <Text style={[styles.commandText]}>
                      Send below curl request via command line to receive the
                      demo notification from expo server
                    </Text>
                    <Text style={[styles.string]}>{this.getCurlString()}</Text>
                  </View>
                  <View style={[styles.action]}>
                    <ClicktoCopy
                      onCopy={() => {
                        Toast.success('Copied');
                      }}
                      text={this.getCurlString()}
                    >
                      <Text style={[styles.buttonText]}>Copy</Text>
                    </ClicktoCopy>
                  </View>
                </View>
              ) : null}
              {notification ? (
                <View style={[styles.response]}>
                  <Text>
                    Received a notification :{JSON.stringify(notification)}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
module.exports = view;
