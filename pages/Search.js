// =============================================
// ============== Product Search ==============
// =============================================
// - Lets users search for products
// - Back button returns to previous screen
// - [ \\Displays search results matching user input\\ ]
// ---------------------------------------------
import React, { useState } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform, 
    StatusBar, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import FoundProducts from '../components/FoundProducts';    // Product Search Results
import productData from '../data/productData';              // SAMPLE product array
// ////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////

export default function Search({ navigation }) {
  const [query, setQuery] = useState('');

  // * Filters Results by top 5 most relevant
  const filteredResults = productData.filter((product) => {
        const combined = `${product.brand} ${product.name}`.toLowerCase()
        return combined.includes(query.toLowerCase());
  }).slice(0, 5); // top 5 results only

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
    >
      {/* ------------------ H E A D E R ------------------ */}
      <View style={styles.outerSearchContainer}>
        {/* --------- Back Button --------- */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faCircleChevronLeft} size={32} color={colors.primaryDeepBlue} />
        </Pressable>
        {/* --------- Search Bar --------- */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputSearchText} 
            value={query}
            onChangeText={setQuery}
            placeholder="Find your product!"
            placeholderTextColor={colors.lightCream}
            autoFocus
          />
        </View>
        {/* --------- Status Bar --------- */}
        <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"  // or 'light-content' depending on background
        />
      </View>
      {/* --------- Search Results --------- */}
      {query !== '' && (
        <FoundProducts 
            result={filteredResults || []} 
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
  },
  outerSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightCream,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 80,
    // marginHorizontal: 16,    
  },
  searchContainer: {
    flex: 1, // Search Bar fills the remaining space
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.slightDarkerCream,
    // margin: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    height: 50,
  },
  backButton: {
    marginRight: 16,
  },
  inputSearchText: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.primaryDeepBlue,
    marginLeft: 16,
  },
});