// =============================================
// =============== StarRating.js ===============
// =============================================
// - Handles user-specific product ratings
// - Uses FontAwesome full & half Star icons
// ---------------------------------------------

import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import colors from '../../constants/colors';

const TOTAL_STARS = 5; // * Amount of stars to display

export default function StarRating({ rating, onRatingChange }) {
  const [currentRating, setCurrentRating] = useState(rating);  // Current value of rating as user slides
  const starContainerRef = useRef(null);  // Reference star cointainer to measure position

  let lastVibratedRating = useRef(rating); // keeps track of haptic vibration

  const panResponder = useRef(
    // PanResponder --->
    // - allows tracking of the user's finger gesture
    // - provides access to x-coordinate touch
    // - uses position to calculate how many stars should be filled as sliding
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Always repond to touch in that area
      onPanResponderMove: (evt, gestureState) => {
        if (starContainerRef.current) {
          starContainerRef.current.measure((fx, fy, width, height, px, py) => {
            const touchX = gestureState.moveX - px; // gives position of container NOT whole screem
            let calculatedRating = (touchX / width) * TOTAL_STARS; // how far across the user has moved
            calculatedRating = Math.max(0, Math.min(TOTAL_STARS, calculatedRating)); 
            const halfStarRounded = Math.round(calculatedRating * 2) / 2; // round to nearest half

            if (halfStarRounded !== lastVibratedRating.current) {
                Haptics.selectionAsync(); // Activate haptic feedback / vibration
                lastVibratedRating.current = halfStarRounded; // update last vibration
            }

            setCurrentRating(halfStarRounded); // display rating in real time
          });
        }
      },
      onPanResponderRelease: () => {
        onRatingChange(currentRating); // saves the rating when done
      },
    })
  ).current;

  // * Iterates through each star to find out if it's a half star, full star or empty star
  const renderStar = (starIndex) => {
    let icon;
    if (currentRating >= starIndex) {
      icon = solidStar;
    } else if (currentRating >= starIndex - 0.5) {
      icon = faStarHalfAlt;
    } else {
      icon = regularStar;
    }
    return (
      <FontAwesomeIcon
        key={starIndex}
        icon={icon}
        size={32}
        color={colors.lialuneBlue}
        style={styles.star}
      />
    );
  };

  return (
    <View
      ref={starContainerRef}  // allows measuring of star container
      style={styles.container}
      {...panResponder.panHandlers} // panHandler = connects gesture to star view
    >
      {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  star: {
    marginHorizontal: 5,
  },
});