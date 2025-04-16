// =====================================================
// ================== Profile Options ==================
// =====================================================
// - Handles the Profile's Categories, Icon & Navigation
// -----------------------------------------------------

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function ProfileOption({ label, icon, onPress }) {
  return (
    <Pressable style={styles.optionRow} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#125DAB" style={styles.optionIcon} />
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#125DAB" style={{ marginLeft: 'auto' }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    width: '100%',
    paddingHorizontal: 20,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    color: colors.primaryDeepBlue,
    fontFamily: fonts.body,
  },
});