import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Rating from '../main';
export default () => {
  const [rating, setRating] = React.useState(0);
  const [secondRating, setSecondRating] = React.useState(0);
  return (
    <View style={[styles.container]}>
      <Text style={[styles.description]}>
        Component for giving ratings e.g Comment Rating, Post Rating etc
      </Text>

      <View style={[styles.section]}>
        <Text style={[styles.title]}>5 Star Rating</Text>
        <View style={[styles.flexRow]}>
          <Rating
            maxStars={5}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            currentRating={rating}
            onChange={(value) => {
              setRating(value);
            }}
            fullStarColor={'red'}
            disabled={false}
          />
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>10 Star Yellow Rating</Text>
        <View style={[styles.flexRow]}>
          <Rating
            maxStars={10}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            currentRating={secondRating}
            onChange={(value) => {
              setSecondRating(value);
            }}
            fullStarColor={'yellow'}
            disabled={false}
          />
        </View>
      </View>
      <View style={[styles.section]}>
        <Text style={[styles.title]}>Disabled</Text>
        <View style={[styles.flexRow]}>
          <Rating
            maxStars={5}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            currentRating={rating}
            onChange={(value) => {
              setRating(value);
            }}
            fullStarColor={'red'}
            disabled={true}
          />
        </View>
      </View>
    </View>
  );
};
