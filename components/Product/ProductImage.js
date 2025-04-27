// ==================================================
// ================== ProductImage ==================
// ==================================================
// - Displays (preferably transparent) Product Image
// - Allows users to UPLOAD their own image
// - Handles transparent vs. non-transparent images
// --------------------------------------------------
import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, ActivityIndicator, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import checkTransparency from '@utilities/checkTransparency';
import colors from '@constants/colors';

export default function ProductImage({ product, imageURI, setCustomImage }) {
  const [isTransparent, setIsTransparent] = useState(true);
  const [loading, setLoading] = useState(true);

  // ---------- Image Upload ----------
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the photo library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCustomImage(product.id, result.assets[0].uri);
    }
  };
  // ---------------------------------
  // ---------- Image Transparency Check on Load ----------
  const handleImageLoad = async () => {
    const transparent = await checkTransparency(imageURI);
    setIsTransparent(transparent);
    setLoading(false);
  };
  // ------------------------------------------------------
  return (
    <Pressable onPress={pickImage} style={styles.container}>
      {loading && (
        <ActivityIndicator size="small" color={colors.primaryDeepBlue} style={styles.loading} />
      )}
      <Image
        source={{ uri: imageURI }}
        style={[
          styles.image,
          !isTransparent && styles.nonTransparentImage,
        ]}
        onLoad={handleImageLoad}
      />
      <View style={styles.editIcon}>
        <Text>
          {/* <Ionicons name="create-outline" size={18} color={colors.lightCream} /> */}
          <FontAwesomeIcon icon={faPaintbrush} size={18} color={colors.primaryDeepBlue} />
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    pointerEvents: 'none',
  },
  nonTransparentImage: {
    borderRadius: 16,
    backgroundColor: colors.lightCream,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.mainLialune,
    borderRadius: 15,
    padding: 6,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
  },
});


// ******************************************************************
// ******************************************************************
// ********************** Dynamic Fit Version ***********************
// ******************************************************************
// import React, { useEffect, useState } from 'react';
// import { View, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import colors from '../../constants/colors';
// import checkTransparency from '../../utilities/checkTransparency';

// export default function ProductImage({ imageUri, onChangeImage }) {
//   const [isTransparent, setIsTransparent] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkImage = async () => {
//       const transparent = await checkTransparency(imageUri);
//       setIsTransparent(transparent);
//       setLoading(false);
//     };
//     checkImage();
//   }, [imageUri]);

//   if (loading) {
//     return <ActivityIndicator size="small" color={colors.primaryDeepBlue} />;
//   }

//   return (
//     <Pressable onPress={onChangeImage} style={styles.imageWrapper}>
//       <Image
//         source={{ uri: imageUri }}
//         style={[
//           styles.productImage,
//           !isTransparent && styles.roundedImage, // Apply rounded corners only if NOT transparent
//         ]}
//         resizeMode={isTransparent ? 'contain' : 'cover'}
//       />
//       {/* Edit Icon Overlay */}
//       <View style={styles.editIcon}>
//         <Ionicons name="pencil" size={20} color={colors.lightCream} />
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   imageWrapper: {
//     position: 'relative',
//     width: 160,
//     height: 160,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   roundedImage: {
//     borderRadius: 12, // Only non-transparent images get rounded
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: colors.lialuneBlue,
//     borderRadius: 15,
//     padding: 5,
//   },
// });