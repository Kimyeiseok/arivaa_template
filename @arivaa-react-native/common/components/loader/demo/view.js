import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import Loader from '../main';

var view = function () {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        Loaders are used to indicate that a task or activity is in waiting
        state. We provide a lot of options to choose from when it comes to
        loaders.
      </Text>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Circular Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="circular" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Plane Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="plane" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Jumping Balls Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="jumping" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Wave Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="wave" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Glow Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="glow" size={50} />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Twice Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="twice" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Spin Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="spin" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>DNA Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="dna" />
          </View>
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Coin Loader</Text>
        <View style={[styles.list]}>
          <View style={[styles.loader]}>
            <Loader type="coin" size={100} />
          </View>
        </View>
      </View>
    </View>
  );
};
module.exports = view;
