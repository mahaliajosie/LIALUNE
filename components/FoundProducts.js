// ================================================
// =============== FoundProducts.js ===============
// ================================================
// - Holds the results for the Search of Products 
// - Bold Matches the typed results
// - On tap, navigates to Product Page
// ------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import spaPupImg from '../assets/spaPup.jpg'; // fallback image 

const FoundProducts = ({ results, query }) => {
  const navigation = useNavigation();

  // - Filter Results based on query
  const queryLower = query.trim().toLowerCase();
  const filteredResults = queryLower && Array.isArray(results)
    ? results.filter(prod =>
        `${prod.brand} ${prod.name}`.toLowerCase().includes(queryLower)
    )
    : []; // * if no query, display nothing

  // - Display top 5 relevant results
  const topResults = filteredResults.slice(0, 5);

  // - Match typed search results
  const matchHighlight = (product) => {
    const fullName = `${product.brand} ${product.name}`;
    if (!queryLower) { return fullName; } // * Don't highlight if empty

    // - Split name (not case sensitive) & save results
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const parts = fullName.split(regex);

    return (
      <Text style={styles.productText} >
      { parts.map((part, index) => {
        if (part.toLowerCase() === queryLower) {
          // - Match query & bold
          return (
            <Text key={index} style={styles.boldText} >
              {part}
            </Text>
          );
        }
        // - Rest of the query is in regular text
        return <Text key={index}>{part}</Text>;
      })}
      </Text>
    );
  };
    
  // - Special Characters
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  return (
      <View>
          {topResults.map(product => (
              <Pressable
                  key={product.id}
                  style={({ pressed }) => [ 
                    styles.item,
                    pressed && styles.itemPressed
                  ]}
                  onPress={() => {
                      // - Navigate to Product Page
                      navigation.navigate('ProductPage', { product});
                  }}
              >
                  {/* --- Product Images --- */}
                <Image
                    source={ product.image ? { uri : product.image } : spaPupImg }
                    defaultSource={spaPupImg}
                    style={styles.image}
                />
                {/* --- Bold the search result --- */}
                {matchHighlight(product)}

                {/* <View style={styles.separator} /> */} {/* --- optional divider --- */}

                {/* <Text style={styles.productName}>
                    {matchHighlight(product.name, query)}
                </Text>  */}
              </Pressable>
          ))}
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginHorizontal: 4,
  },
  imagePressed: {
    backgroundColor: '#D2E6FF'
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
  boldText: {
    fontWeight: 'bold',
    color: colors.primaryDeepBlue,
  },
  // separator: {
  //   height: 1,
  //   backgroundColor: '#ACACAC',
  //   marginLeft: 60 // indent past image 
  // },
});

export default FoundProducts;
