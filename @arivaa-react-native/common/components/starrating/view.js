import React from 'react';
import StarRating from 'react-native-star-rating';
var view = function () {
  const { rating } = this.state;
  const {
    maxStars,
    emptyStar,
    fullStar,
    halfStar,
    iconSet,
    fullStarColor,
    disabled,
  } = this.props;
  return (
    <StarRating
      disabled={disabled}
      emptyStar={emptyStar}
      fullStar={fullStar}
      halfStar={halfStar}
      iconSet={iconSet}
      maxStars={maxStars}
      fullStarColor={fullStarColor}
      rating={rating}
      selectedStar={this.onChange}
    />
  );
};
module.exports = view;
