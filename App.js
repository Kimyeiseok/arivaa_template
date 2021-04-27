import './arivaa.config';
import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import 'react-native-gesture-handler';
import { configureExpoComponents } from '@arivaa-react-native/expo';
import { LocalizeProvider } from 'react-localize-redux';
import { Setup } from './setup';

/**
 * Main App Setup Component
 */
const Main = (props) => {
  const [isReady, setReady] = useState(false);
  const configureApp = async () => {
    await configureExpoComponents();
    setReady(true);
  };
  useEffect(() => {
    configureApp();
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <LocalizeProvider>
      <Setup />
    </LocalizeProvider>
  );
};

Main.displayName = 'App';
export default Main;
