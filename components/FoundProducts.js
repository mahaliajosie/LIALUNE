// ================================================
// ================ Found Products ================
// ================================================
// - Holds the results for the Search of Products 
// - Bold Matches the typed results
// - On tap, navigates to Product Page
// ------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import spaPupImg from '../assets/spaPup.jpg'; // fallback image 


const FoundProducts = ({ results, query, onPressResult }) => {
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
    if (!queryLower) {
      // - Makes sure this match works not just for plain strings 
      return <Text style={styles.productText}>{fullName}</Text>;
    }

    // - Split name (not case sensitive) & save results
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const parts = fullName.split(regex);

    return (
      <Text style={styles.productText}>
      {parts.map((part, index) => {
        regex.lastIndex = 0; // Reset Regex
        return regex.test(part) ? ( 
          // - Match query & bold
          <Text key={index} style={styles.boldText}>
            {part}
          </Text>
        ) : (
          // - Rest of the query is in regular text
          <Text key={index} style={styles.productText}>
            {part}
          </Text>
        );
      })}
      </Text>
    );
  };
    
  // - Special Characters
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  return (
      <View style={styles.resultContainer}>
          {topResults.map(product => (
              <Pressable
                  key={product.id}
                  style={({ pressed }) => [ 
                    styles.item,
                    pressed && styles.itemPressed
                  ]}
                  // - Navigate to Product Page
                  onPress={() => {
                    if (onPressResult) {
                      onPressResult(product);
                    } else {
                      navigation.navigate('ProductPage', { product });
                    }
                  }}
              >
                  {/* --- Product Images --- */}
                <Image
                    source={ product.image ? { uri: product.image } : spaPupImg }
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
  resultContainer: {
    backgroundColor: colors.lightCream,
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 16,
    marginTop: 10,
  },
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
    fontFamily: fonts.boldBody,
    color: colors.primaryDeepBlue,
  },
  // separator: {
  //   height: 1,
  //   backgroundColor: '#ACACAC',
  //   marginLeft: 60 // indent past image 
  // },
});

export default FoundProducts;
