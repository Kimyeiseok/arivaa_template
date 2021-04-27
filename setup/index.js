import React, { useEffect, useState } from 'react';
import { Provider } from '@ant-design/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import initializeLocalization from '../localization';
import Navigator from '../routing';
import preProcess from '../helpers/preprocess';
import createStore from '../redux';
import { AppLoading } from 'expo';
import { askPermissions } from '@arivaa-react-native/expo/helpers/permissions';
import { configure as configureSegment } from '@arivaa-react-native/expo/helpers/analytics';
import { PERMISSIONS, SEGMENT } from '../constants/environment';
import enUS from '@ant-design/react-native/es/locale-provider/en_US';

const Main = (props) => {
  const [store, setStore] = useState(null);
  useEffect(() => {
    setStore(createStore());
    initializeLocalization(props);
    configureSegment(SEGMENT);
    askPermissions(PERMISSIONS);
  }, []);
  return store ? (
    <Provider locale={enUS}>
      <ReduxProvider store={store}>
        <Navigator {...props} />
      </ReduxProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
};
export const Setup = preProcess(Main, { localize: true });
