import React from 'react';
import styles from './styles';
import { View } from 'react-native';
import { LinkBack, GooglePlacesDropdown } from '@arivaa-react-native/common';

import MapView from 'react-native-maps';
import { GOOGLE_PLACES_KEY } from '../../constants/environment';

var view = function () {
  const { region } = this.state;
  return (
    <View style={[styles.container]}>
      <View style={[styles.back]}>
        <LinkBack />
      </View>
      <View style={[styles.map]}>
        <GooglePlacesDropdown
          placeholder="Where do you want to go?"
          minLength={2} // minimum length of text to search
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log({
              data,
              details,
            });
            const { geometry } = details;
            this.setState({
              region: {
                ...this.state.region,
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
              },
            });
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_PLACES_KEY,
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            container: {
              zIndex: 2,
            },
            row: {
              backgroundColor: '#fff',
            },
            textInputContainer: {
              width: '100%',
              backgroundColor: '#f3f3f3',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <MapView
          style={[styles.mapView]}
          initialRegion={region}
          region={region}
        />
      </View>
    </View>
  );
};
module.exports = view;
