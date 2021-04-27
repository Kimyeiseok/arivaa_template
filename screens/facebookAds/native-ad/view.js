import React from 'react';
import { Text, View } from 'react-native';

var view = function () {
  return (
    <View>
      <Text>{this.props.nativeAd.bodyText}</Text>
    </View>
  );
};
module.exports = view;
