// ==================================================
// ================= Product Actions ================
// ==================================================
// - Handles interactivity
// - Favorite toggle & Add to Routine button
// - Positioned at top-right of Product Info
// --------------------------------------------------
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as solidHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useProductContext } from '../../context/ProductContext';
import colors from '../../constants/colors';

export default function ProductActions({ product, openPopUp }) {
  const { favorites, toggleFavorite } = useProductContext();
  const isFavorited = favorites[product.id];

  return (
    <View style={styles.container}>
      {/* ---------- Favorite Toggle ---------- */}
      <Pressable onPress={() => toggleFavorite(product.id)} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} size={24} color={colors.mainLialune} />
        {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,0,0,0.3)' }} /> */}
      </Pressable>

      {/* ---------- Add to Routine  ---------- */}
      <Pressable onPress={openPopUp} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <FontAwesomeIcon icon={faPlus} size={24} color={colors.mainLialune} />
        {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,0,0,0.3)' }} /> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    pointerEvents: 'none',
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.lightCream,
    alignItems: 'center',
    justifyContent: 'center',
    // pointerEvents: 'none',
  },
  pressed: {
    opacity: 0.6,
    // pointerEvents: 'none',
  },
});