import React, { useState } from 'react';
import { Checkbox } from '@ant-design/react-native';
import { View, Text } from 'react-native';
import { Colors } from '../../styles';
/**
 * CheckBox Component
 * @param {} param0
 */
const Main = ({
  text,
  value,
  onChange,
  disabled,
  defaultChecked,
  ...props
}) => {
  const [checked, setChecked] = useState(value || false);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Checkbox
        style={{
          color: Colors.primaryColor,
        }}
        {...props}
        defaultChecked={defaultChecked || false}
        checked={checked}
        disabled={disabled || false}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange instanceof Function && onChange(e.target.checked);
        }}
      />
      <Text
        style={{
          paddingLeft: 10,
          paddingTop: 2,
        }}
      >
        {text || ''}
      </Text>
    </View>
  );
};

Main.propTypes = {};

Main.displayName = 'Checkbox';

export default Main;
