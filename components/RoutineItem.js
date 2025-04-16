// ===================================================
// ================== Routine Items ==================
// ===================================================
// - Handles each routine step & product
// - Allows for a drag handle between steps
// - Renders the products: image, name, brand & step
// ---------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function RoutineItem({ item, drag, isActive, index }) {
  return (
    // Drag Item function with Long Press
    <Pressable
      style={[
        styles.itemContainer,
        isActive && { backgroundColor: colors.textSecondary }
      ]}
      onLongPress={drag}
    >
        {/* ------- Step Number ------- */}
      <Text style={styles.stepText}>{`Step ${index + 1}:`}</Text>
        
        {/* ------- Product Image - Rounded Square style ------- */}
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      {/* ------- Groups Title & Brand ------- */}
      <View style={styles.textWrapper}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
      </View>
      <Ionicons name="menu" size={24} color={colors.mainLialune} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',                   // side by side for step number, image, text, etc.
    alignItems: 'center',                   // vertically aligns center
    paddingVertical: 14,                    // spacing*
    paddingHorizontal: 10,                  // spacing*
    backgroundColor: colors.lightCream,     // container in Cream background
    marginVertical: 6,                      // spacing*
    borderRadius: 10,                       // rounded corners
    elevation: 1,                           // subtle shadow for Android
  },
  stepText: {  // --- style for "Step: X" ---
    fontSize: 18,
    fontFamily: fonts.body,
    color: colors.primaryDeepBlue,
    marginRight: 8,
  },
  productImage: {
    width: 36,
    height: 36,
    borderRadius: 6, 
    marginRight: 12,    // space between image & text
  },
  textWrapper: {    // --- Product brand fills space between image & drag icon ---
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.mainLialune,
  },
  productBrand: {
    fontSize: 12,
    fontFamily: fonts.subtext,
    color: colors.primaryDeepBlue,
  },
}); 
