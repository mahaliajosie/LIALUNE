// ===============================================
// ================== ProductPage ================
// ===============================================
// - Displays a product's full details
// - Allows favoriting, rating, image replacement
// - Offers "Add to Routine" popup trigger
// -----------------------------------------------

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, 
         Pressable, ScrollView, Modal, TouchableOpacity} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductContext } from '../context/ProductContext';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function ProductPage() {
  const { params: { product } } = useRoute();
  const navigation = useNavigation();

  const {
    favorites,
    ratings,
    customImages,
    toggleFavorite,
    setRating,
    setCustomImage,
  } = useProductContext();

  const [modalVisible, setModalVisible] = useState(false);

  const userRating = ratings[product.id] || 0;
  const isFavorited = favorites[product.id];
  const imageURI = customImages[product.id] || product.image;

  // * Custom Image upload handler
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access library is required!');
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

  // * 5-Star Rating Handle 
  const handleRating = (value) => {
    setRating(product.id, value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.lightCream} />
        </Pressable>
        <Text style={styles.headerTitle}>Lialune</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* ---------- Product Image ---------- */}
      <Pressable onPress={pickImage}>
        <Image source={{ uri: imageURI }} style={styles.productImage} />
      </Pressable>

      {/* ---------- Brand Logo + Name ---------- */}
      <Image source={{ uri: product.brandLogo }} style={styles.brandLogo} />
      <Text style={styles.nameText}>{product.name}</Text>

      {/* ---------- Favorite + Add Buttons ---------- */}
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={32}
            color={colors.lialuneBlue}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={36} color={colors.lialuneBlue} />
        </TouchableOpacity>
      </View>

      {/* ---------- Rating ---------- */}
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => {
          const icon =
            userRating >= star
              ? 'star'
              : userRating >= star - 0.5
              ? 'star-half'
              : 'star-outline';
          return (
            <Pressable key={star} onPress={() => handleRating(star)}>
              <Ionicons name={icon} size={26} color="#FFD700" />
            </Pressable>
          );
        })}
      </View>

      {/* ---------- Description / Directions / Ingredients ---------- */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.sectionText}>{product.description}</Text>

      {product.directions ? (
        <>
          <Text style={styles.sectionTitle}>Directions</Text>
          <Text style={styles.sectionText}>{product.directions}</Text>
        </>
      ) : null}

      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.sectionText}>{product.ingredients}</Text>

      {/* ---------- Add to Routine Modal ---------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Add to routine coming soon!</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundBlue,
    alignItems: 'center',
    paddingBottom: 80,
  },
  header: {
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.mainLialune,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.title,
    color: colors.lightCream,
  },
  productImage: {
    width: 180,
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  brandLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontFamily: fonts.body,
    color: colors.mainLialune,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.title,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: '#003366',
  },
  sectionText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: '#333',
    marginHorizontal: 20,
    marginTop: 8,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  modalClose: {
    color: colors.mainLialune,
    fontWeight: 'bold',
  },
});