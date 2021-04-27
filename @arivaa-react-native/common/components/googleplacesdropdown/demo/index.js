import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import GooglePlaces from '../main';

export default () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        Component for google place search
      </Text>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Default Search</Text>
        <View style={[styles.flexRow]}>
          <GooglePlaces
            query={{
              key: 'AIzaSyBItTiaGwjhgGrWEb3tf4Y2IwXfcDl5zfU',
              language: 'en',
            }}
            value={'New York'}
            placeholder="Search Cities"
          />
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>City Search</Text>
        <View style={[styles.flexRow]}>
          <GooglePlaces
            query={{
              key: 'AIzaSyBItTiaGwjhgGrWEb3tf4Y2IwXfcDl5zfU',
              language: 'en',
              types: '(cities)',
            }}
            value={'Delhi'}
            placeholder="Search Cities"
          />
        </View>
      </View>
    </View>
  );
};
