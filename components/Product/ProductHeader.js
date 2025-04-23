// ==============================================
// ============== ProductHeader.js ==============
// ==============================================
// - Displays app name ("lialune") at the top
// - Back button to navigate back
// - Clean, reusable header across screens
// ----------------------------------------------

import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default function ProductHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* ----- Back Button ----- */}
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesomeIcon icon={faCircleChevronLeft} size={36} color={colors.mainLialune} />
      </Pressable>

      {/* ----- App Title ----- */}
      <Text style={styles.title}>lialune</Text>

      {/* ----- Spacer for symmetry ----- */}
      <View style={{ width: 36 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 80,
    paddingHorizontal: 20,
    backgroundColor: colors.lightCream,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 24,
    color: colors.mainLialune,
  },
});