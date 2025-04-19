// ================================================
// =============== FoundProducts.js ===============
// ================================================
// - Holds the results for the Search of Products 
// - Bold Matches the typed results
// ------------------------------------------------

import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function FoundProducts({ results, query }) {
  const boldMatch = (text) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <Text style={styles.productText}>{text}</Text>;

    return (
      <Text style={styles.productText}>
        {text.substring(0, index)}
        <Text style={styles.boldMatch}>{text.substring(index, index + query.length)}</Text>
        {text.substring(index + query.length)}
      </Text>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {boldMatch(`${item.brand} ${item.name}`)}
    </View>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingVertical: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginHorizontal: 4,
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productText: {
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.mainLialune,
    flexShrink: 1,
  },
  boldMatch: {
    fontWeight: 'bold',
    color: colors.primaryDeepBlue,
  },
});