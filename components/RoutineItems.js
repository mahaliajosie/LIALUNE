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
    <Pressable
      style={[
        styles.itemContainer,
        isActive && { backgroundColor: colors.lightCream }
      ]}
      onLongPress={drag}
    >
      <Text style={styles.stepText}>{`Step ${index + 1}:`}</Text>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 10,
    elevation: 1,
  },
  stepText: {
    color: colors.textSecondary,
    marginRight: 8,
    fontWeight: '500',
  },
  productImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#125DAB',
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
  },
});
