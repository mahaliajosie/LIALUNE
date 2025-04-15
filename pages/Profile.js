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
import { Ionicons } from '@expo/vector-icons';

// Profile function - the screen users see for their profile page
export default function Profile() {
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
    <View style={styles.profileWrapper}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {/* ------------------ Upload Profile Image ------------------ */}
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
            {/* --------------------------------------------------------- */}
            {/* ---------------------- Routine Sections ---------------------- */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Routine</Text>
                <Option label="face" icon="happy-outline" />
                <Option label="hair" icon="cut-outline" />
                <Option label="body" icon="body-outline" />
                <Option label="nails" icon="finger-print-outline" />
                <View style={styles.divider} /> 
                <Option label="favorites" icon="heart-outline" />
                <Option label="color" icon="color-palette-outline" />
            </View>
            {/* -------------------------------------------------------------- */}   
        </ScrollView>
    </View>
  );
}

// Function that gives each category row with a left icon, text, then right arrow
function Option({ label, icon }) {
    return (
      <Pressable style={styles.optionRow}>
        <Ionicons name={icon} size={20} color="#125DAB" style={styles.optionIcon} />
        <Text style={styles.optionText}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#125DAB" style={{ marginLeft: 'auto' }} />
      </Pressable>
    );
  }  


// UI Style for Profile
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // full scrolling area height
    backgroundColor: '#D6EDFF', // Light Blue for whole page
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 80,
  },
  profileWrapper: {
    flex: 1,
    backgroundColor: '#D6EDFF',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75, // circle profile pic
    overflow: 'hidden', // clip image to circle
    borderWidth: 2,
    borderColor: '#EADDCA', // Light Cream Border
    marginTop: 45,
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
    marginTop: 18,
    fontFamily: 'Italiana_400Regular',
    color: '#70C1FF', // Lialune Blue
    alignItems: 'center',
  },
  nameInput: {
    fontSize: 42,
    marginTop: 18,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
    borderBottomWidth: 1,
    borderColor: '#EADDCA',
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 30,
    width: '85%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'RammettoOne_400Regular',
    color: '#0068B8', // Deep Blue for "Routine" title
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row', // makes row horizontal
    alignItems: 'center',
    paddingVertical: 25,
  },
  optionIcon: {
    marginRight: 12, // add space between icon & label
  },
  optionText: {
    fontSize: 18,
    color: '#0068B8', // Deep Blue for each category/Option
    fontFamily: 'Gantari_500Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#FBF8F4', // Light Cream divider
    marginVertical: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
});