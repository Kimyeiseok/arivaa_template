import React from 'react';
import { Elements } from '@arivaa-react-native/common';
import { Demo as DemoList } from '@arivaa-react-native/expo';

import preProcess from '../../helpers/preprocess';

const Main = (props) => {
  const { navigation } = props;
  return (
    <React.Fragment>
      <Elements data={DemoList} navigation={navigation} />
    </React.Fragment>
  );
};
Main.displayName = 'UI-Elements';

export default preProcess(Main, {
  localize: true,
});
