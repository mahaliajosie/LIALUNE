import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

export default function ProductPage() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RectButton onPress={() => navigation.goBack()} style={{ padding: 20, backgroundColor: 'red' }}>
        <Text style={{ color: 'white' }}>TEST BACK BUTTON</Text>
      </RectButton>
    </View>
  );
}

// // ===============================================
// // ================= ProductPage =================
// // ===============================================
// // - Displays the product's full details
// // - Favorite, Rate, User's Image replacement
// // - "Add to Routine" pop-up redirect
// // -----------------------------------------------
// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useProductContext } from '@context/ProductContext';
// import colors from '@constants/colors';
// import fonts from '@constants/fonts';
// // ---------- Components ----------
// import ProductHeader from '@components/Product/ProductHeader'; 
// import ProductImage from '@components/Product/ProductImage'; 
// import ProductDetails from '@components/Product/ProductDetails'; 
// import ProductActions from '@components/Product/ProductActions'; 
// import AddToRoutine from '@components/Product/modal/AddToRoutine';
// import ProductInfo from '@components/Product/ProductInfo';
// // --------------------------------
// import { RectButton } from 'react-native-gesture-handler';

// export default function ProductPage() {
//   const navigation = useNavigation();
//   const { params: { product } } = useRoute();
//   const { favorites,
//           toggleFavorite, 
//           ratings, 
//           setRating,     
//           customImages, 
//           setCustomImage } = useProductContext();

//   const [modalVisible, setModalVisible] = useState(false);

//   const userRating = ratings[product.id] || 0;
//   const isFavorited = favorites[product.id];
//   const imageURI = customImages[product.id] || product.image;

//   return (
//     <View style={styles.container}>
//       {/* --------- Header (App Name & Back Button) --------- */}
//       {/* <ProductHeader navigation={navigation} /> */}
//       <ProductHeader />


//       {/* <Pressable onPress={() => navigation.goBack()} style={{ padding: 20, backgroundColor: 'red' }}>
//         <Text style={{ color: 'white' }}>TEST Back Button</Text>
//       </Pressable> */}
//       {/* <View style={{ padding: 20, backgroundColor: 'red' }}>
//         <Text style={{ color: 'white' }}>Touchable Test Area</Text>
//         <Pressable onPress={() => alert('Pressed!')} style={{ padding: 10, backgroundColor: 'blue' }}>
//           <Text style={{ color: 'white' }}>Press Me</Text>
//         </Pressable>
//       </View> */}
//       {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <RectButton onPress={() => navigation.goBack()} style={{ padding: 20, backgroundColor: 'red' }}>
//           <Text style={{ color: 'white' }}>TEST BACK BUTTON</Text>
//         </RectButton>
//       </View> */}

//       <ScrollView contentContainerStyle={styles.scrollContent}
//                   keyboardShouldPersistTaps="handled" 
//                   pointerEvents="box-none">
//         <View style={styles.topSection}>
//           {/* --------- Product Image --------- */}
//           <ProductImage 
//             product={product}
//             imageURI={imageURI}
//             setCustomImage={setCustomImage}
//           />

//           {/* --------- Brand Logo, Name, Rating --------- */}
//           <ProductDetails 
//             product={product}
//             userRating={userRating}
//             setRating={setRating}
//           />
//         </View>

//         {/* --------- Favorite & Add Buttons --------- */}
//         <ProductActions 
//           product={product}
//           isFavorited={isFavorited}
//           toggleFavorite={toggleFavorite}
//           setModalVisible={setModalVisible}
//         />

//         {/* --------- Product Description, Directions, Ingredients --------- */}

//         <ProductInfo
//           description={product.description}
//           directions={product.directions}
//           ingredients={product.ingredients}
//         />
//         {/* *** might create separate component for this *** */}
//         {/* <View style={styles.infoSection}>
//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.sectionText}>{product.description}</Text>

//           {product.directions && (
//             <>
//               <Text style={styles.sectionTitle}>Directions</Text>
//               <Text style={styles.sectionText}>{product.directions}</Text>
//             </>
//           )}

//           <Text style={styles.sectionTitle}>Ingredients</Text>
//           <Text style={styles.sectionText}>{product.ingredients}</Text>
//         </View> */}
//       </ScrollView>

//       {/* --------- Add to Routine Pop-Up --------- */}
//       <AddToRoutine 
//           modalVisible={modalVisible}
//           setModalVisible={setModalVisible}
//         />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundBlue,
//   },
//   scrollContent: {
//     paddingTop: 140,      // Match your header height
//     paddingBottom: 100, 
//   },
//   topSection: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   infoSection: {
//     marginTop: 30,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontFamily: fonts.heading,
//     color: colors.primaryDeepBlue,
//     marginBottom: 5,
//   },
//   sectionText: {
//     fontSize: 14,
//     fontFamily: fonts.subtext,
//     color: '#333',
//     lineHeight: 20,
//     marginBottom: 15,
//   },
// });