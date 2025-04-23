// ==============================================
// ================== ProductPage ==============
// ==============================================
// - Displays the product's full details
// - Favorite, Rate, User's Image replacement
// - "Add to Routine" pop-up redirect
// ---------------------------------------------
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import colors from '../constants/colors';
import fonts from '../constants/fonts';
// ---------------- Components ----------------
import ProductImage from '../components/ProductPage/ProductImage';
import ProductDetails from '../components/ProductPage/ProductDetails';
import ProductActions from '../components/ProductPage/ProductActions';

export default function ProductPage() {
  const navigation = useNavigation();
  const { params: { product } } = useRoute();

  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); 

  const toggleFavorite = () => setIsFavorite(prev => !prev);

  return (
    <View style={styles.container}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faCircleChevronLeft} size={36} color={colors.primaryDeepBlue} />
        </Pressable>
        <Text style={styles.title}>lialune</Text>
        <View style={{ width: 36 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ---------- Product Top Section ---------- */}
        <View style={styles.topSection}>
          <ProductImage product={product} />
          <ProductDetails 
            product={product} 
            rating={rating} 
            setRating={setRating} 
          />
          <ProductActions 
            isFavorite={isFavorite} 
            toggleFavorite={toggleFavorite} 
            setModalVisible={setModalVisible} 
          />
        </View>

        {/* ---------- Description / Directions / Ingredients ---------- */}
        <View style={styles.infoSection}>
          {product.description && (
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.sectionText}>{product.description}</Text>
            </>
          )}

          {product.directions && (
            <>
              <Text style={styles.sectionTitle}>Directions</Text>
              <Text style={styles.sectionText}>{product.directions}</Text>
            </>
          )}

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionText}>{product.ingredients}</Text>
        </View>
      </ScrollView>

      {/* ---------- Add to Routine Modal ---------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Add to Routine Coming Soon!</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.lightCream,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 24,
    color: colors.mainBlue,
  },
  content: {
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.primaryDeepBlue,
    marginTop: 20,
  },
  sectionText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.darkText,
    marginTop: 8,
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
    color: colors.mainBlue,
    fontWeight: 'bold',
  },
});