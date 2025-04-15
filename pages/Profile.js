// ================================================
// ================ Profile Screen ================
// ================================================
// - Users' profile page for routines & settings
// - Upload a circular profile photo
// - Edit users' name for the page
// ------------------------------------------------

import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Pressable } from 'react-native';
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

//   const toggleEditName = () => {
//     setEditingName(!editingName);
//   };

  return (
    <View style={styles.container}>
        <Pressable onPress={pickImage}>
            <Image
                source={
                    image ? { uri: image } : require('../assets/spaPup.jpg') // default profile image
                }
                style={styles.profilePic}
            />
            <View style={styles.editIcon}>
                {/* <Text style={{ color: '#fff' }}>✎</Text> */}
                {/* <Ionicons name="pencil" size={20} color="#70C1FF" /> */}
                <Ionicons name="create-outline" size={20} color="#70C1FF"/>
            </View>
        </Pressable>
        
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

      {/* Previous Editing Name */}
      {/* <TouchableOpacity onPress={toggleEditName}>
        {editingName ? (
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            onBlur={() => setEditingName(false)}
            autoFocus
          />
        ) : (
          <Text style={styles.nameText}>{name}</Text>
        )}
      </TouchableOpacity> */}

      {/* Add your routine sections here below if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EDFF', // Light Blue for whole page
    alignItems: 'center',
    paddingTop: 60,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75, // circle profile pic
    overflow: 'hidden', // clip image to circle
    borderWidth: 2,
    borderColor: '#EADDCA', // Light Cream Border
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#70C1FF', // Deep Sky Blue (Lialune Blue)
    borderRadius: 12,
    padding: 5,
  },
  nameText: {
    fontSize: 42,
    marginTop: 12,
    fontFamily: 'Italiana_400Regular',
    color: '#70C1FF', // Lialune Blue
  },
  nameInput: {
    fontSize: 42,
    marginTop: 12,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 8,
  },
});