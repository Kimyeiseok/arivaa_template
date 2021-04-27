import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import CheckBox from '../main';

export default () => (
  <View style={[styles.container]}>
    <Text style={[styles.description]}>
      Checkbox component which can be used to take true/false options from user
    </Text>

    <View style={[styles.section]}>
      <Text style={[styles.title]}>Example 1</Text>
      <View style={[styles.flexRow]}>
        <CheckBox
          defaultChecked={false}
          value={false}
          disabled={false}
          text={'I Agree to terms and conditions?'}
        />
      </View>
    </View>
    <View style={[styles.section]}>
      <Text style={[styles.title]}>Default Checke</Text>
      <View style={[styles.flexRow]}>
        <CheckBox
          defaultChecked={true}
          value={false}
          disabled={false}
          text={'Yes I Agree to terms and conditions?'}
        />
      </View>
    </View>
    <View style={[styles.section]}>
      <Text style={[styles.title]}>Please Select one of below options</Text>
      <View style={[styles.flexRow]}>
        <CheckBox
          defaultChecked={false}
          value={false}
          disabled={false}
          text={'Option 1'}
        />
        <CheckBox
          defaultChecked={false}
          value={false}
          disabled={false}
          text={'Option 2'}
        />
        <CheckBox
          defaultChecked={false}
          value={false}
          disabled={false}
          text={'Option 3'}
        />
        <CheckBox
          defaultChecked={false}
          value={false}
          disabled={true}
          text={'Disabled'}
        />
      </View>
    </View>
  </View>
);
