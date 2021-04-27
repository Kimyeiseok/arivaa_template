import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Video from '../main';
export default ({ setScroll }) => {
  useEffect(() => {
    setScroll(false);
  }, []);
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        Video Player Component for playing both online and offline videos
      </Text>

      <View style={[styles.section]}>
        <Text style={[styles.title]}>Online Video</Text>
        <Text style={[styles.title]}>
          (http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4)
        </Text>
        <View style={[styles.flexRow]}>
          <Video
            uri={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
          />
        </View>
      </View>
    </View>
  );
};
