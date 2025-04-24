// ====================================================
// ================== Product Info ====================
// ====================================================
// - Static Information Display of: 
// --- Product Description, Directions, & Ingredients
// - Scrollable for content overflow
// ----------------------------------------------------

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default function ProductInfo({ description, directions, ingredients }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------- Description ---------- */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.sectionText}>{description}</Text>

      {/* ---------- Directions (if any) ---------- */}
      {directions ? (
        <>
          <Text style={styles.sectionTitle}>Directions</Text>
          <Text style={styles.sectionText}>{directions}</Text>
        </>
      ) : null}

      {/* ---------- Ingredients ---------- */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.sectionText}>{ingredients}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightCream,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.primaryDeepBlue,
    marginTop: 12,
    marginBottom: 6,
    backgroundColor: colors.mainLialune, // * NEED to wrap in a separate container for the section titles 
  },
  sectionText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: '#AF8346', // - darker brown color
    lineHeight: 20, // - spacing between lines
  },
});