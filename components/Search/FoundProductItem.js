// ====================================================
// ================ Found Product Item ================
// ====================================================
// - Handles each product result & navigation
// ----------------------------------------------------

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import BoldText from './BoldText';
import colors from '../../constants/colors';
// import fonts from '../../constants/fonts';
import spaPupImg from '../../assets/spaPup.jpg';

export default function FoundProductItem({ product, query, onPressResult }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPressResult) {
      onPressResult(product);
    } else {
      navigation.navigate('ProductPage', { product });
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed
      ]}
      onPress={handlePress}
    >
      <Image
        source={product.image ? { uri: product.image } : spaPupImg}
        defaultSource={spaPupImg}
        style={styles.image}
      />
      <BoldText
        text={`${product.brand} ${product.name}`}
        query={query}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: colors.accent,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginHorizontal: 4,
  },
  itemPressed: {
    backgroundColor: '#D2E6FF',
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 10,
  },
});