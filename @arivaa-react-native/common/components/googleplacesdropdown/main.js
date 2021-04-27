import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

/**
 * @description Google Places Component
 * @type Component
 * @author Inderdeep
 */
const Main = ({ value, onChange, onPress, ...props }) => {
  return (
    <GooglePlacesAutocomplete
      getDefaultValue={() => value || ''}
      {...props}
      onPress={(data, details) => {
        onChange instanceof Function && onChange(data);
        if (onPress instanceof Function) {
          onPress(data, details);
        }
      }}
    />
  );
};

export default Main;
Main.displayName = 'Google-Places';
