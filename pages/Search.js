// =============================================
// ============== Product Search ==============
// =============================================
// - Lets users search for products
// - Back button returns to previous screen
// - [ \\Displays search results matching user input\\ ]
// ---------------------------------------------
import React, { useState } from 'react';
import { View, 
    TextInput, 
    StyleSheet, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform } from 'react-native';

// import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import FoundProducts from '../components/FoundProducts';    // Product Search Results
import productData from '../data/productData';              // SAMPLE product array
// ////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////
// import { useNavigation } from '@react-navigation/native';

export default function Search({navigation}) {
//   const navigation = useNavigation();

  const [query, setQuery] = useState('');

  // Filters Results by top 5 most relevant
  const filteredResults = productData.filter((product) => {
        const combined = `${product.brand} ${product.name}`.toLowerCase()
        return combined.includes(query.toLowerCase());
  }).slice(0, 5);

//   const filteredProducts = productData.filter(product =>
//     product.name.toLowerCase().includes(query.toLowerCase())
//   ).slice(0, 5); // top 5 results only

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
    >
      {/* --------- Header with Search Bar & Back Button --------- */}
      <View style={styles.searchContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* <Ionicons name="arrow-back" size={28} color={colors.primaryDeepBlue} /> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" size={28} color={colors.primaryDeepBlue} /> */}
          <FontAwesomeIcon icon="fa-solid fa-circle-left" size={28} color={colors.primaryDeepBlue} />
        </Pressable>
        <TextInput
          style={styles.inputSearchText} 
          value={query}
          onChangeText={setQuery}
          placeholder="Find your product!"
          placeholderTextColor={colors.lightCream}
          autoFocus
        />
      </View>

      {/* --------- Condtional Results if Searching --------- */}
      {query !== '' && (
        <FoundProducts 
            result={filteredResults} 
            query={query}
            onPressResult={(product) =>
                navigation.navigate('ProductPage', { product })
            } 
        />
       )}
    </KeyboardAvoidingView>
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