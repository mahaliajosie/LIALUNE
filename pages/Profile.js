// ================================================
// ================ Profile Screen ================
// ================================================
// - Users' profile page for routines & settings
// - Upload a circular profile photo
// - Edit users' name for the page
// ------------------------------------------------

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('Mahalia');
  const [editingName, setEditingName] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.AssetType.Images,
      allowsEditing: true,
      aspect: [1, 1], // crop box
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleEditName = () => {
    setEditingName(!editingName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../assets/default-profile.png') // replace with default image in your assets folder
          }
          style={styles.profilePic}
        />
        <View style={styles.editIcon}>
          <Text style={{ color: '#fff' }}>✎</Text>
        </View>
      </TouchableOpacity>

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
    backgroundColor: '#DDECF5',
    alignItems: 'center',
    paddingTop: 60,
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65, // circle profile pic
    overflow: 'hidden', // clip image to circle
    borderWidth: 2,
    borderColor: '#B2D4E8',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#125DAB',
    borderRadius: 12,
    padding: 5,
  },
  nameText: {
    fontSize: 24,
    marginTop: 12,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
  },
  nameInput: {
    fontSize: 24,
    marginTop: 12,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 8,
  },
});