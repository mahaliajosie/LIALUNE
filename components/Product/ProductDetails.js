// =====================================================
// ================== Product Details ==================
// =====================================================
// - Handles all Product info in the RIGHT column: 
// - Favorite & Add Buttons
// - Brand Logo
// - Product Name
// - Star Rating
// -----------------------------------------------------
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import StarRating from './StarRating';

import colors from '@constants/colors';
import fonts from '@constants/fonts';

export default function ProductDetails({ product, isFavorited, toggleFavorite, userRating, setRating, setModalVisible }) {
  return (
    <View style={styles.container}>
      {/* ---------- Favorite & Add Buttons ---------- */}
      <View style={styles.iconRow}>
        <Pressable onPress={() => toggleFavorite(product.id)} style={styles.iconButton}>
          <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} size={30} color={colors.mainLialune} />
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.iconButton}>
          <FontAwesomeIcon icon={faCirclePlus} size={30} color={colors.mainLialune} />
        </Pressable>
      </View>

      {/* ---------- Brand Logo ---------- */}
      <Image source={{ uri: product.brandLogo }} style={styles.logo} />

      {/* ---------- Product Name ---------- */}
      <Text style={styles.name}>{product.name}</Text>

      {/* ---------- 5-Star Rating ---------- */}
      <StarRating
        rating={userRating}
        onRatingChange={(newRating) => setRating(product.id, newRating)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 10,
  },
  iconButton: {
    padding: 5,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontFamily: fonts.body,
    fontSize: 20,
    color: colors.mainLialune,
    textAlign: 'right',
    marginBottom: 10,
  },
});