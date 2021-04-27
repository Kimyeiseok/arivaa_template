import React from 'react';
import { configureDependencies } from '@arivaa-react-native/common';
import * as Icon from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as SocialAuth from './social-auth';
import * as Maps from 'react-native-maps';
import ImagePicker from './image-picker';
import WebBrowser from './web-browser';
const dependencies = {
  'vector-icons': Icon,
  video: Video,
  'image-picker': ImagePicker,
  maps: Maps,
  'social-auth': SocialAuth,
  'web-browser': WebBrowser,
};
configureDependencies(dependencies);
