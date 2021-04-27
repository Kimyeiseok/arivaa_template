import React from 'react';
import styles from './styles';
var view = function () {
  const { uri, getDependency, ...props } = this.props;
  const Video = getDependency('video');
  return (
    <Video
      source={uri}
      useNativeControls={true}
      resizeMode="cover"
      style={styles.backgroundVideo}
      {...props}
    />
  );
};
module.exports = view;
