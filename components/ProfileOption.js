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
      <Ionicons name={icon} size={20} color={colors.primaryDeepBlue} style={styles.optionIcon} />
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.primaryDeepBlue} style={{ marginLeft: 'auto' }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: 'row', // makes row horizontal
        alignItems: 'center',
        paddingVertical: 25,
        borderBottomColor: '#EEE', // light gray line under each item
        borderBottomWidth: 1,
    },
    optionIcon: {
        marginRight: 12, // add space between icon & label
        size: 24,
    },
    optionText: {
        flex: 1,          // take up remaining space so arrow is pushed to far right
        fontSize: 18,
        color: colors.primaryDeepBlue, // Deep Blue for each category/Option
        fontFamily: fonts.body,
    },
});