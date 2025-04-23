// =================================================
// ================ ProductImage.js ================
// =================================================
// - Displays product image
// - Allows users to upload their own image
// - Handles transparent vs. non-transparent images
// -------------------------------------------------
import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from '../constants/colors';
// import checkTransparency from '../../utils/checkTransparency';

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
        <Ionicons name="create-outline" size={18} color={colors.lightCream} />
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
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