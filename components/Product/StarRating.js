// =============================================
// =============== StarRating.js ===============
// =============================================
// - Handles user-specific product ratings
// - Uses FontAwesome full & half Star icons
// ---------------------------------------------

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import colors from '../constants/colors';

export default function StarRating({ rating, onRatingChange }) {
  const handlePress = (starValue) => {
    onRatingChange(starValue);
  };

  const renderStar = (starIndex) => {
    let icon;
    if (rating >= starIndex) {
      icon = solidStar;
    } else if (rating >= starIndex - 0.5) {
      icon = faStarHalfAlt;
    } else {
      icon = regularStar;
    }

    return (
      <Pressable key={starIndex} onPress={() => handlePress(starIndex)}>
        <FontAwesomeIcon
          icon={icon}
          size={28}
          color={colors.mainLialune}
          style={styles.star}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((starIndex) => renderStar(starIndex))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    marginHorizontal: 4,
  },
});