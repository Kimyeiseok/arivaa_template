import React from 'react';

import LottieView from 'lottie-react-native';
import circularLoader from '../loader/animations/loader';
import planeLoader from '../loader/animations/128-around-the-world';
import jumpingBalls from '../loader/animations/40-loading';
import wave from '../loader/animations/196-material-wave-loading';
import glow from '../loader/animations/197-glow-loading';
import twice from '../loader/animations/719-loading';
import spin from '../loader/animations/855-simple-loading';
import dna from '../loader/animations/912-dna-like-loader';
import coin from '../loader/animations/1309-smiley-stack';

/**
 * View
 * @returns {XML}
 */
var view = function () {
  let { type, propStyles, size } = this.props;
  type = (type || '').toLowerCase();

  switch (type) {
    case 'circular':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={circularLoader}
        />
      );
    case 'plane':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={planeLoader}
        />
      );
    case 'jumping':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={jumpingBalls}
        />
      );
    case 'wave':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={wave}
        />
      );
    case 'glow':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={glow}
        />
      );
    case 'twice':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={twice}
        />
      );
    case 'spin':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={spin}
        />
      );
    case 'dna':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={dna}
        />
      );
    case 'coin':
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{ width: size || 50, height: size || 50 }}
          source={coin}
        />
      );
  }
};
module.exports = view;
