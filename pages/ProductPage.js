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
import ProductHeader from '@components/Product/ProductHeader'; 
import ProductImage from '@components/Product/ProductImage'; 
import { useProductContext } from '@context/ProductContext';
import ProductDetails from '@components/Product/ProductDetails'; 
import ProductActions from '@components/Product/ProductActions'; 
import ProductInfo from '@components/Product/ProductInfo';
import AddToRoutine from '@components/Product/modal/AddToRoutine';
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
    <View style={{ flex: 1, backgroundColor: 'rgba(192, 17, 215, 0.1)' }}>
      {/* --------- HEADER (App Name & Back Button) --------- */}
      <ProductHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled" 
                  pointerEvents="box-none">

        <View style={styles.topSection}>
          {/* --------- Product Image --------- */}
          <View style={styles.imageContainer}>
            <ProductImage 
              product={product}
              imageURI={imageURI}
              setCustomImage={setCustomImage}
            />
          </View>
          {/* --------- Product Name & Rating --------- */}
            <ProductDetails 
              product={product}
              userRating={userRating}
              setRating={setRating}
            />
        </View>
        {/* --------- Favorite & Add Buttons --------- */}
        <ProductActions 
           product={product}
           isFavorited={isFavorited}
           toggleFavorite={toggleFavorite}
           setModalVisible={setModalVisible}
        />
        {/* --------- Brand Logo --------- */}
        {product.brandLogo && (
          <Image
            source={{ uri: product.brandLogo }}
            style={styles.brandLogo}
          />
        )}
        

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
  // container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // button: { padding: 20, backgroundColor: 'red' },
  // text: { color: 'white' },

  scrollContent: {
    paddingTop: 80,      // Match header height
    paddingBottom: 100, 
  },
  brandLogo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: 200, 
    height: 200, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});