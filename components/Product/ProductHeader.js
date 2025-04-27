// ==============================================
// =============== Product Header ===============
// ==============================================
// - Displays app name ("lialune") at the top
// - Back button to navigate back
// - Clean, reusable header across screens
// ----------------------------------------------

import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import colors from '@constants/colors';
import fonts from '@constants/fonts';

export default function ProductHeader() {
  const navigation = useNavigation();
  // console.log('Navigation object:', navigation);
  console.log('Can go back?', navigation.canGoBack());

  return (
    <View style={styles.headerContainer} pointerEvents="box-none">
      {/* ----- Back Button ----- */}
      {/* <Pressable onPress={() => navigation.goBack()} style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} >
        <FontAwesomeIcon icon={faCircleChevronLeft} size={36} color={colors.mainLialune} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,0,0,0.3)' }} />
      </Pressable> */}
      {/* <RectButton onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>
          <FontAwesomeIcon icon={faCircleChevronLeft} size={36} color={colors.mainLialune} />
        </Text>
      </RectButton> */}

      <Pressable onPress={() => { 
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          console.warn('Cannot Go Back')
        }
      }} style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} > 
          <FontAwesomeIcon icon={faCircleChevronLeft} size={36} color={colors.mainLialune} />
      </Pressable>

      {/* ----- App Title ----- */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>lialune</Text>
      </View>

      {/* ----- Spacer for symmetry ----- */}
      <View style={{ width: 36 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 80,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: colors.lightCream,
    zIndex: 10, 
    elevation: 10,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center', 
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 40,
    color: colors.mainLialune,
  },
  backButton: {
    padding: 5,
  },
});