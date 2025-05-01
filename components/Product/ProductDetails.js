// =====================================================
// ================== Product Details ==================
// =====================================================
// - Handles Brand Logo, Name, & Star Rating 
// - Displayes Favorite toggle & 'Add to Routine' Button 
// ------------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useProductContext } from '@context/ProductContext'; 
import StarRating from './StarRating'; // Handles the 0.5-5 star rating system
import colors from '@constants/colors';
import fonts from '@constants/fonts';

export default function ProductDetails({ product, onAddPress }) {
  const { favorites, toggleFavorite, ratings, setRating } = useProductContext();
  const isFavorited = favorites[product.id];
  const userRating = ratings[product.id] || 0;

  return (
    <View style={styles.detailsContainer}>
      {/* ---------- Favorite & Add Buttons ---------- */}
        {/* === should these buttons remain here OR in ProductActions? === */}

      {/* <View style={styles.topIcons}>
        <Pressable onPress={() => toggleFavorite(product.id)} style={styles.iconButton} >
          <FontAwesomeIcon 
            icon={ isFavorited ? Icons.heartSolid : Icons.heartEmpty } 
            size={30}
            color={colors.mainLialune}/>
        </Pressable>  
        <Pressable onPress={() => setModalVisible(true)} style={styles. iconButton} > 
          <FontAwesomeIcon icon={Icons.addCircle} size={32} color={colors.mainLialune} />
        </Pressable>
      </View> */}
      {/* -------------touchable opacity version(x) ------------------- */}
        {/* <TouchableOpacity onPress={() => toggleFavorite(product.id)}> */}
          {/* <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={30}
              color={colors.mainLialune}
            /> */}
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={onAddPress}>
          <Ionicons name="add-circle-outline" size={32} color={colors.mainLialune} />
        </TouchableOpacity> */}

      {/* ---------- Brand Logo ---------- */}
      {/* <Image
        source={{ uri: product.brandLogo }}
        style={styles.brandLogo}
      /> */}

      {/* ---------- Product Name ---------- */}
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
    justifyContent: 'flex-start',
    marginLeft: 20,
    // justifyContent: 'center',
    // pointerEvents: 'none',
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 10,
    // pointerEvents: 'none',
    // gap: 16,
  },
  brandLogo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    fontFamily: fonts.body,
    color: colors.mainLialune,
    marginBottom: 10,
  },
});