// ================================================
// ================ Profile Screen ================
// ================================================
// - Users' profile page for routines & settings
// - Upload a circular profile photo
// - Edit users' name for the page
// ------------------------------------------------

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const [image, setImage] = useState(null); // uploaded image uri
  const [name, setName] = useState('Mahalia'); // default name
  const [editingName, setEditingName] = useState(false); // edit name toggle

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.AssetType.Images,
      allowsEditing: true, // enables cropping
      aspect: [1, 1], // crop box
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // image uri from picker
    }
  };

  const toggleEditName = () => {
    setEditingName(!editingName);
  };

// Temp Profile Image
{/* { uri: 'https://placekitten.com/200/200' } // temp image from web */}

{/* <Image
          source={
            image
              ? { uri: image }
              : require('assets/spaPup.jpg') // default profile image
          }
          style={styles.profilePic}
        /> */}

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
          <Ionicons name="pencil" size={20} color="#70C1FF" />
        </View>
      </Pressable>

      <TouchableOpacity onPress={toggleEditName}>
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
      </TouchableOpacity>

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