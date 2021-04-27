import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import ClickToCopy from '../main';

export default () => (
  <View style={[styles.container]}>
    <Text style={[styles.description]}>
      Component for copying text to clipboard
    </Text>

    <View style={[styles.section]}>
      <Text style={[styles.title]}>Copy Text - (I am Awesome)</Text>
      <View style={[styles.flexRow]}>
        <ClickToCopy
          onCopy={() => {
            alert('Copied.. Try Pasting it somewhere');
          }}
        >
          Click To Copy
        </ClickToCopy>
      </View>
    </View>
  </View>
);
