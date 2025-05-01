// ===============================================
// ================= ProductPage =================
// ===============================================
// - Displays the product's full details
// - Favorite, Rate, User's Image replacement
// - "Add to Routine" pop-up redirect
// -----------------------------------------------
import React, { useState } from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// ---------- Components ----------
import ProductHeader from '@components/Product/ProductHeader';      // Back Button & App Name Header
import ProductImage from '@components/Product/ProductImage';        // Transparent Image
import ProductDetails from '@components/Product/ProductDetails';    // Right-Column Product Summary
import ProductInfo from '@components/Product/ProductInfo';          // Product Description, Directions, & Ingredients
import { useProductContext } from '@context/ProductContext';        // Store Product Data
import AddToRoutine from '@components/Product/modal/AddToRoutine';  // Pop-up to Add-to-Routine
// --------------------------------

export default function ProductPage() {
  const navigation = useNavigation();
  const { params: { product } } = useRoute();
  const { favorites,
          toggleFavorite, 
          ratings, 
          setRating,     
          customImages, 
          setCustomImage } = useProductContext();

  const [modalVisible, setModalVisible] = useState(false);
  const imageURI = customImages[product.id] || product.image;
  const userRating = ratings[product.id] || 0;
  const isFavorited = favorites[product.id];

  return (
    <View style={styles.container}>
      {/* --------- HEADER (App Name & Back Button) --------- */}
      <ProductHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled" 
                  pointerEvents="box-none">

        <View style={styles.topSection}>
          {/* --------- Product Image --------- */}
          {/* <View style={styles.imageContainer}> */}
            <ProductImage 
              product={product}
              imageURI={imageURI}
              setCustomImage={setCustomImage}
            />
          {/* </View> */}
          {/* --------- Right Column Info: --------- */}
          {/* --------- Favorite & Add Buttons, Brand Logo, Product Name & Rating --------- */}
            <ProductDetails 
              product={product}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              userRating={userRating}
              setRating={setRating}
              setModalVisible={setModalVisible}
            />
        </View>
        
        {/* --------- Product Description, Directions, Ingredients --------- */}
        <ProductInfo
          description={product.description}
          directions={product.directions}
          ingredients={product.ingredients}
        />

        {/* --------- Add to Routine Pop-Up --------- */}
        <AddToRoutine 
          visible={modalVisible}                  
          onClose={() => setModalVisible(false)}  
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'rgba(192, 17, 215, 0.1)' // Purple TEST Background
  },
  scrollContent: {
    paddingTop: 80,      // To match the header height
    paddingBottom: 100, 
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});