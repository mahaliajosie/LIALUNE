// =====================================================
// ================== Product Details ==================
// =====================================================
// - Handles Brand Logo, Name, & Star Rating 
// - Displayes Favorite toggle & 'Add to Routine' Button 
// ------------------------------------------------------

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useProductContext } from '../../context/ProductContext'; 
import StarRating from './StarRating'; // Handles the 0.5-5 star rating system
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default function ProductDetails({ product, onAddPress }) {
  const { favorites, toggleFavorite, ratings, setRating } = useProductContext();
  const isFavorited = favorites[product.id];
  const userRating = ratings[product.id] || 0;

  return (
    <View style={styles.detailsContainer}>
      {/* ---------- Favorite & Add Buttons ---------- */}
        {/* === should these buttons remain here OR in ProductActions? === */}

      {/* <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={30}
            color={colors.mainLialune}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddPress}>
          <Ionicons name="add-circle-outline" size={32} color={colors.mainLialune} />
        </TouchableOpacity>
      </View> */}

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
    // pointerEvents: 'none',
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    alignSelf: 'flex-end',
    marginBottom: 10,
    // pointerEvents: 'none',
  },
  brandLogo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    // pointerEvents: 'none',
  },
  productName: {
    fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    fontFamily: fonts.body,
    color: colors.mainLialune,
    marginBottom: 10,
    // pointerEvents: 'none',
  },
});