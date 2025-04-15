// ================================================
// ================ Profile Screen ================
// ================================================
// - Users' profile page for routines & settings
// - Upload a circular profile photo
// - Edit users' name for the page
// ------------------------------------------------

import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Allows user imports from device
// import { Ionicons } from '@expo/vector-icons';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Profile function - the screen users see for their profile page
export default function Profile({ navigation }) {
  const [image, setImage] = useState(null); // users' uploaded image uri is held here OR default
  const [name, setName] = useState('Mahalia'); // default name
  const [editingName, setEditingName] = useState(false); // edit name toggle - if the name currently being edited

  // Function to open image library of a user
  const pickImage = async () => {

    // Grabs access to the user's photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access photo library is required!');
        return;
      }

    // Opens up the photo library & enables cropping
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.AssetType.Images,
      allowsEditing: true, // enables cropping
      aspect: [1, 1], // crop box
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // save image uri from ImagePicker
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.profileSection}>
            {/* ------------------ Upload Profile Image ------------------ */}
            <View style={styles.profileWrapper}>
                <Pressable onPress={pickImage}>
                    <Image
                        source={
                            image ? { uri: image } : require('../assets/spaPup.jpg') // default profile image
                        }
                        style={styles.profilePic}
                    />
                    <View style={styles.editIcon}>
                        {/* <Text style={{ color: '#fff' }}>✎</Text> */}
                        {/* <Ionicons name="create-outline" size={20} color="#70C1FF" /> */}
                        <Ionicons name="pencil" size={20} color="#EADDCA"/>
                    </View>
                </Pressable>
            </View>
            {/* ----------------------------------------------------------- */}
            {/* ---------------------- Edit Name ---------------------- */}
            {editingName ? (
                <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChange={setName}
                    onBlur={() => setEditingName(false)}
                    autoFocus
                />
            ) : (
                <Pressable onPress={() => setEditingName(true)}>
                    <Text style={styles.nameText}>{name}</Text>
                </Pressable>
            )}
        </View>

        <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Routine</Text>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* --------------------------------------------------------- */}
            {/* ---------------------- Routine Sections ---------------------- */}
            {/* ////// FACE ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('RoutineEdit', { category: 'Face' })}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="spa" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>face</Text>
                <Ionicons name="chevron-forward" size={20} color="#0068B8" /> 
            </Pressable>
            {/* ////// HAIR ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('RoutineEdit', { category: 'Hair' })}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="cut" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>hair</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </Pressable>
            {/* ////// BODY ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('RoutineEdit', { category: 'Body' })}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="pump-soap" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>body</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </Pressable>
            {/* ////// NAILS ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('RoutineEdit', { category: 'Nails' })}
            >
                <View style={styles.icon}>
                    <FontAwesome5 name="hand-sparkles" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>nails</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </Pressable>

            {/* * * * Category Divider * * * */}
            <View style={styles.divider} /> 

            {/* ////// FAVS ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('Favorites')}
            >
                <View style={styles.icon}>
                    <Ionicons name="heart" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>favorites</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </Pressable>
            {/* ////// COLOR ////// */}
            <Pressable 
                style={styles.menuRow} 
                onPress={() => navigation.navigate('ColorThemes')}
            >
                <View style={styles.icon}>
                    <MaterialIcons name="palette" size={20} color="#125DAB" />
                </View>
                <Text style={styles.menuText}>color</Text>
                <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </Pressable>
            {/* <View style={styles.section}> 
                <Option label="face" icon="happy-outline" />
                <Option label="hair" icon="cut-outline" />
                <Option label="body" icon="body-outline" />
                <Option label="nails" icon="finger-print-outline" />
                <View style={styles.divider} /> 
                <Option label="favorites" icon="heart-outline" />
                <Option label="color" icon="color-palette-outline" />
            </View> */}
            {/* -------------------------------------------------------------- */}   
            </ScrollView>
            </View>
    </View>
  );
}

// Function that gives each category row with a left icon, text, then right arrow
// function Option({ label, icon }) {
//     return (
//       <Pressable style={styles.optionRow}>
//         <Ionicons name={icon} size={20} color="#125DAB" style={styles.optionIcon} />
//         <Text style={styles.optionText}>{label}</Text>
//         <Ionicons name="chevron-forward" size={20} color="#125DAB" style={{ marginLeft: 'auto' }} />
//       </Pressable>
//     );
//   }  


// UI Style for Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6EDFF',      // light blue background (full screen)
        paddingTop: 80,                  // top spacing to account for status bar & design 
        // paddingHorizontal removed to let inner content manage its own horizontal padding
    },
    profileSection: {
        alignItems: 'center',   // center pfp & name
        marginBottom: 20,       // space below profile
    },
    profileWrapper: {
        position: 'relative',     // edit icon over the profile image
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75, // circle profile pic
        overflow: 'hidden', // clip image to circle
        borderWidth: 2,
        borderColor: '#EADDCA', // Light Cream Border
        // marginTop: 45,
      },
      editIcon: {
        position: 'absolute', // icon on top of Profile pic & anchored to the bottom-right
        bottom: 5, 
        right: 5,
        backgroundColor: '#70C1FF', // Deep Sky Blue (Lialune Blue)
        borderRadius: 20, // small circlular badge
        padding: 5,
      },
  
  nameText: {
    fontSize: 42,
    marginTop: 18, // space between name & profile picture
    fontFamily: 'Italiana_400Regular',
    color: '#70C1FF', // Lialune Blue
  },
  nameInput: {
    fontSize: 42,
    marginTop: 18,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
    borderBottomWidth: 1,
    borderColor: '#EADDCA',
  },
  titleWrapper: {
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'RammettoOne_400Regular',
    color: '#0068B8', // Deep Blue for "Routine" title
    marginBottom: 10,
    textAlign: 'left',
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 48,         // side padding for all scroll container
    paddingBottom: 80,             // bottom padding so last items aren't cut off
  },
  menuRow: {
    flexDirection: 'row', // makes row horizontal
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomColor: '#EEE', // light gray line under each item
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 12, // add space between icon & label
  },
  menuText: {
    flex: 1,          // take up remaining space so arrow is pushed to far right
    fontSize: 18,
    color: '#0068B8', // Deep Blue for each category/Option
    fontFamily: 'Gantari_500Medium',
  },
  divider: {
    // borderBottomColor: '#EADDCA', // slightly bolder line for section break
    // borderBottomWidth: 4,
    // marginVertical: 20,
    height: 4,                     // thicker line
    width: '75%',                  // shorter line
    backgroundColor: '#EADDCA',    // light cream color
    borderRadius: 10,              // round edges
    alignSelf: 'center',           // center in container
    marginVertical: 20,            // spacing above and below
  },
});