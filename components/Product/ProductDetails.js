// =====================================================
// ================== Product Details ==================
// =====================================================
// - Displays Brand Logo, Product Name & Rating System
// - Buttons = Favorite toggle & add-to-routine 
// ------------------------------------------------------

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from '../constants/colors';
import fonts from '../constants/fonts';
// import StarRating from './StarRating'; // Handles the 0.5-5 star rating system
// import { useProductContext } from '../context/ProductContext';

export default function ProductDetails({ product, onAddPress }) {
  const { favorites, toggleFavorite, ratings, setRating } = useProductContext();
  const isFavorited = favorites[product.id];
  const userRating = ratings[product.id] || 0;

  return (
    <View style={styles.detailsContainer}>
      {/* ---------- Favorite & Add Buttons ---------- */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={30}
            color={colors.mainLialune}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddPress}>
          <Ionicons name="add-circle-outline" size={32} color={colors.lialuneBlue} />
        </TouchableOpacity>
      </View>

      {/* ---------- Brand Logo & Product Info ---------- */}
      <Image
        source={{ uri: product.brandLogo }}
        style={styles.brandLogo}
      />
      <Text style={styles.productName}>{product.name}</Text>

      {/* ---------- Star Rating ---------- */}
      <StarRating
        rating={userRating}
        onRatingChange={(newRating) => setRating(product.id, newRating)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  brandLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontFamily: fonts.body,
    color: colors.mainLialune,
    marginBottom: 10,
  },
});