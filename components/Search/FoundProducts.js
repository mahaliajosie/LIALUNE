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
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { Pressable } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native'; 
// import colors from '../../constants/colors';
// import fonts from '../../constants/fonts';
// import spaPupImg from '../assets/spaPup.jpg'; // fallback image 


import React from 'react';
import { View, StyleSheet } from 'react-native';
import FoundProductItem from './FoundProductItem';
import colors from '../../constants/colors';

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

// const styles = StyleSheet.create({
//   resultContainer: {
//     backgroundColor: colors.lightCream,
//     borderRadius: 12,
//     paddingVertical: 15,
//     marginHorizontal: 16,
//     marginTop: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 18,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//     paddingBottom: 8,
//     marginHorizontal: 4,
//   },
//   imagePressed: {
//     backgroundColor: '#D2E6FF'
//   },
//   image: {
//     width: 32,
//     height: 32,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   productText: {
//     fontSize: 16,
//     fontFamily: fonts.body,
//     color: colors.mainLialune,
//     flexShrink: 1,
//   },
//   boldText: {
//     fontFamily: fonts.boldBody,
//     color: colors.primaryDeepBlue,
//   },
//   // separator: {
//   //   height: 1,
//   //   backgroundColor: '#ACACAC',
//   //   marginLeft: 60 // indent past image 
//   // },
// });

// export default FoundProducts;
