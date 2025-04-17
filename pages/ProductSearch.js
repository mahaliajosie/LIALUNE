// =======================================================
// ================ Product Search Screen ================
// =======================================================
// - User driven search field 
// - Bold match product name
// - Adding to direct to Product Page
// -------------------------------------------------------
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import fonts from '../constants/fonts';
import productData from '../data/productData'; // SAMPLE Product Source/Database


export default function ProductSearch({ route }) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  // * Filter & limit results to top 5 most relevant
  const filteredResults = productData
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  // * Splits product name and bold the word that matches the product
  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.bold}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  // * will need to change to direct to Product Page
  const handleSelect = (product) => {
    navigation.navigate('RoutineEdit', { selectedProduct: product });
  };

  return (
    <View style={styles.container}>
      {/* --------- Back Arrow & Search Bar --------- */}
      <View style={styles.searchWrapper}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.mainLialune} />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search products"
          placeholderTextColor="#AAA"
        />
      </View>

      {/* --------- Results --------- */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.resultItem} onPress={() => handleSelect(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.resultText}>
              {highlightMatch(item.name, search)}
            </Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    {/* ---------- Status Bar ---------- */}
    <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"  // or 'dark-content' depending on background
    /> 
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundBlue,
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightCream,
      paddingHorizontal: 15,
      borderRadius: 30,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
      fontFamily: fonts.body,
      marginLeft: 10,
    },
    resultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
    },
    image: {
      width: 36,
      height: 36,
      marginRight: 10,
      borderRadius: 4,
    },
    resultText: {
      fontSize: 15,
      color: '#003366',
      fontFamily: fonts.body,
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: fonts.body,
      color: '#003366',
    },
    separator: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 4,
    },
  });