// ================================================
// =============== FoundProducts.js ===============
// ================================================
// - Holds the results for the Search of Products 
// - Bold Matches the typed results
// - On tap, navigates to Product Page
// ------------------------------------------------
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from './constants/colors';
import fonts from './constants/fonts';

const FoundProducts = ({ results, query, navigation }) => {
    // - Display top 5 relevant results
    const displayFive = results.slice(0, 5);

    // - Match typed search results
    const matchHighlight = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase()
                ? <Text key={index} style={styles.highlightBold}>{part}</Text>
                : <Text key={index}>{part}</Text> 
        );
    };
    
    return (
        <View>
            {displayFive.map(product => (
                <TouchableOpacity
                    key={product.id}
                    style={styles.resultItem}
                    onPress={() => {
                        // - Navigate to Product Page
                        navigation.navigate('ProductPage', { product: product});
                    }}
                >
                    {/* --- Bold the search result --- */}
                    <Text style={styles.productName}>
                        {matchHighlight(product.name, query)}
                    </Text>
                    {/* --- Additional Info of Product like: description, where to buy, etc. --- */} 
                </TouchableOpacity>
            ))}
        </View>
    );
};
//   const boldMatch = (text) => {
//     const index = text.toLowerCase().indexOf(query.toLowerCase());
//     if (index === -1) return <Text style={styles.productText}>{text}</Text>;

//     return (
//       <Text style={styles.productText}>
//         {text.substring(0, index)}
//         <Text style={styles.boldMatch}>{text.substring(index, index + query.length)}</Text>
//         {text.substring(index + query.length)}
//       </Text>
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.resultItem}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       {boldMatch(`${item.brand} ${item.name}`)}
//     </View>
//   );

//   return (
//     <FlatList
//       data={results}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem}
//       contentContainerStyle={{ paddingVertical: 20 }}
//     />
//   );

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
//   image: {
//     width: 32,
//     height: 32,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
  productName: {
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.mainLialune,
    flexShrink: 1,
  },
  highlightBold: {
    fontWeight: 'bold',
    color: colors.primaryDeepBlue,
  },
});

export default FoundProducts;