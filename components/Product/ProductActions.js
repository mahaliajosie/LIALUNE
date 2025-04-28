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
import { useProductContext } from '@context/ProductContext';
import colors from '@constants/colors';
import { Icons } from '@constants/icons';

export default function ProductActions({ product, openPopUp }) {
  const { favorites, toggleFavorite } = useProductContext();
  const isFavorited = favorites[product.id];

  return (
    <View style={styles.container}>
      {/* ---------- Favorite Toggle ---------- */}
      <Pressable onPress={() => toggleFavorite(product.id)} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <FontAwesomeIcon icon={isFavorited ? Icons.heartSolid : Icons.heartEmpty} size={24} color={colors.mainLialune} />
      </Pressable>

      {/* ---------- Add to Routine  ---------- */}
      <Pressable onPress={openPopUp} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <FontAwesomeIcon icon={Icons.addCircle} size={24} color={colors.mainLialune} />
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