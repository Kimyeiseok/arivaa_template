import React from 'react';
import { Clipboard } from 'react-native';

import Button from '../button';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Click to Copy
 * @param {} param0
 */
const Main = ({ children, text, onCopy, buttonProps }) => {
  const onCopyText = () => {
    Clipboard.setString(text);
    onCopy instanceof Function && onCopy();
  };
  let markUp = null;
  if (children && typeof children === 'string') {
    markUp = (
      <Button onPress={onCopyText} {...buttonProps}>
        {children}
      </Button>
    );
  } else {
    return <TouchableOpacity onPress={onCopyText}>{children}</TouchableOpacity>;
  }
  return markUp;
};

Main.propTypes = {};

Main.displayName = 'Carousel-Component';

export default Main;
