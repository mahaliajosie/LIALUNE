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
        <ScrollView 
            contentContainerStyle={styles.sectionContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {/* --------------------------------------------------------- */}
            {/* ---------------------- Routine Sections ---------------------- */}
            <Text style={styles.sectionTitle}>Routine</Text>
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
        borderRadius: 60, // circle profile pic
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
        // padding: 5,
      },
//   scrollContainer: {
//     flexGrow: 1, // full scrolling area height
//     backgroundColor: '#D6EDFF', // Light Blue for whole page
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 20,
//     paddingTop: 80,
//     paddingBottom: 80,
//   },
//   profileWrapper: {
//     flex: 1,
//     backgroundColor: '#D6EDFF',
//     alignItems: 'center',
//   },
  
  nameText: {
    fontSize: 42,
    marginTop: 18, // space between name & profile picture
    fontFamily: 'Italiana_400Regular',
    color: '#70C1FF', // Lialune Blue
    // alignItems: 'center',
  },
  nameInput: {
    fontSize: 42,
    marginTop: 18,
    fontFamily: 'Italiana_400Regular',
    color: '#1E3D59',
    borderBottomWidth: 1,
    borderColor: '#EADDCA',
    // paddingHorizontal: 8,
  },
  sectionContainer: {
    // marginTop: 30,
    // width: '85%',
    // alignItems: 'center',
    paddingHorizontal: 20,         // side padding for all scroll container
    paddingBottom: 40,             // bottom padding so last items aren't cut off
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'RammettoOne_400Regular',
    color: '#0068B8', // Deep Blue for "Routine" title
    marginBottom: 10,
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
    borderBottomColor: '#B6C3D1', // slightly bolder line for section break
    borderBottomWidth: 1,
    marginVertical: 20,
    // height: 1,
    // backgroundColor: '#FBF8F4', // Light Cream divider
    // marginVertical: 20,
    // alignItems: 'center',
  },
});





// =============================================
// =============================================
// =============================================

// Profile.js (updated)

import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('Mahalia');
  const [editingName, setEditingName] = useState(false);

  // (Assume image picker function and font loading are handled in the app container)

  return (
    <View style={styles.container}>
      {/* Profile Section: Avatar and Username */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image 
            source={image ? { uri: image } : require('../assets/profile-avatar.png')} 
            style={styles.avatar} 
          />
          <TouchableOpacity 
            style={styles.editIcon} 
            onPress={() => { /* trigger image picker or edit profile */ }}
          >
            <Ionicons name="create" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* Username (editable on long press or toggle) */}
        {editingName ? (
          <TextInput 
            style={styles.username} 
            value={name} 
            onChangeText={setName} 
            onBlur={() => setEditingName(false)} 
            autoFocus 
          />
        ) : (
          <TouchableOpacity onLongPress={() => setEditingName(true)}>
            <Text style={styles.username}>{name}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Routine Sections List */}
      <ScrollView contentContainerStyle={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.menuHeader}>Routine</Text>

        {/* Routine category items */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('RoutineEdit', { category: 'Face' })}
        >
          <View style={styles.icon}>
            <FontAwesome5 name="spa" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>face</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('RoutineEdit', { category: 'Hair' })}
        >
          <View style={styles.icon}>
            <FontAwesome5 name="cut" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>hair</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('RoutineEdit', { category: 'Body' })}
        >
          <View style={styles.icon}>
            <FontAwesome5 name="pump-soap" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>body</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('RoutineEdit', { category: 'Nails' })}
        >
          <View style={styles.icon}>
            <FontAwesome5 name="hand-sparkles" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>nails</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        {/* Section separator between Routine and other options */}
        <View style={styles.separator} />

        {/* Other profile options */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Favorites')}
        >
          <View style={styles.icon}>
            <Ionicons name="heart" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>favorites</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('ColorThemes')}
        >
          <View style={styles.icon}>
            <MaterialIcons name="palette" size={20} color="#125DAB" />
          </View>
          <Text style={styles.menuLabel}>color</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EDFF',      // light blue background (full screen)
    paddingTop: 60,                  // top spacing to account for status bar and design padding
    // paddingHorizontal removed to let inner content manage its own horizontal padding
  },
  profileSection: {
    alignItems: 'center',            // center the avatar and name
    marginBottom: 20,               // space below profile info
  },
  avatarWrapper: {
    position: 'relative',           // allows the edit icon to be positioned over the image
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,               // circular image
    borderWidth: 2,
    borderColor: '#EADDCA',         // light cream border around avatar
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#125DAB',     // dark blue badge background
    padding: 6,
    borderRadius: 20,               // circular badge for icon
    // (The pencil icon color is set to white in the Ionicons component)
  },
  username: {
    fontSize: 24,
    marginTop: 10,                 // space between avatar and name
    fontFamily: 'Italiana_400Regular',
    color: '#125DAB',              // dark blue text for name (use #70C1FF if lighter look is desired)
    // fontWeight can be omitted since custom font is used (or use '400' if needed for fallback)
  },
  menuContainer: {
    paddingHorizontal: 20,         // apply side padding for all scroll content
    paddingBottom: 40,             // some bottom padding so last item isn’t cut off
  },
  menuHeader: {
    fontSize: 24,
    fontWeight: 'bold',           // bold section title (use RammettoOne_400Regular if available)
    color: '#125DAB',             // dark blue color for "Routine"
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#EEE',    // light gray line under each item
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 15,              // space between icon and text
  },
  menuLabel: {
    flex: 1,                      // take up remaining space so chevron pushes to right
    fontSize: 16,
    color: '#1C4E80',             // slightly lighter blue for labels
    textTransform: 'capitalize',  // display "face" as "Face", etc.
    // fontFamily: 'Gantari_500Medium' can be added if that font is loaded and desired
  },
  separator: {
    borderBottomColor: '#B6C3D1', // slightly bolder line for section break
    borderBottomWidth: 1,
    marginVertical: 12,
  },
});