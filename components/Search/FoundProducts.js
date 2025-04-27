// ================================================
// ================ Found Products ================
// ================================================
// - Holds the results for the Search of Products 
// - Bold Matches the typed results
// - On tap, navigates to Product Page
// ------------------------------------------------
// - Maps through results & renders each item
// - Displays the top 5 matches to query
// ------------------------------------------------
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FoundProductItem from './FoundProductItem';
import colors from '@constants/colors';

export default function FoundProducts({ results, query, onPressResult }) {
  const queryLower = query.trim().toLowerCase();
  const filteredResults = queryLower && Array.isArray(results)
    ? results.filter(prod =>
        `${prod.brand} ${prod.name}`.toLowerCase().includes(queryLower)
      )
    : [];

  const topResults = filteredResults.slice(0, 5);

  return (
    <View style={styles.resultContainer}>
      {topResults.map(product => (
        <FoundProductItem
          key={product.id}
          product={product}
          query={query}
          onPressResult={onPressResult}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: colors.lightCream,
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 16,
    marginTop: 10,
  },
});
