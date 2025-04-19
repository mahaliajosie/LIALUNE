// =============================================
// ============== Product Search ==============
// =============================================
// - Lets users search for products
// - Back button returns to previous screen
// - [ \\Displays search results matching user input\\ ]
// ---------------------------------------------

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

import colors from '../constants/colors';
import fonts from '../constants/fonts';
import FoundProducts from './components/FoundProducts';  // Product Search Results
import productData from '../data/productData';      // SAMPLE product array

export default function ProductSearch({navigation}) {
//   const navigation = useNavigation();
  const [query, setQuery] = useState('');

  // Filters Results by top 5 most relevant
  const filteredResults = query ? 
    productData.filter(product =>
        `${product.brand} ${product.name}`.toLowerCase()
        .includes(query.toLowerCase())
    ).slice(0, 5)
    : [];

//   const filteredProducts = productData.filter(product =>
//     product.name.toLowerCase().includes(query.toLowerCase())
//   ).slice(0, 5); // top 5 results only

  return (
    <View style={styles.container}>
      {/* --------- Header with Search Bar & Back Buttone --------- */}
      <View style={styles.searchContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.primaryDeepBlue} />
        </Pressable>
        <TextInput
          style={styles.inputSearchText} 
          placeholder="Find your product!"
          placeholderTextColor={colors.lightCream}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* --------- Condtional Results --------- */}
      {query !== '' && <FoundProducts result={filteredResults} query={query} />}

    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slightDarkerCream,
    // margin: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height:50,
  },
  backButton: {
    marginRight: 10,
  },
  inputSearchText: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.primaryDeepBlue,
    marginLeft: 16,
  },
});