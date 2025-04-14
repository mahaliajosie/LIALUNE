// ================================================
// ============ LIALUNE Startup Screen ============
// ================================================
// - Displays the Lialune logo 
// - Fades after 2 seconds
// - Navigates to the Home Routine Screen next 
// ------------------------------------------------

// (1) imports the React Library - core for writing functional components
// • useEffect = React hook, for effects & animations after render
// • useRef = Creates mutable value (fadeAnim) that persists between renders without triggering re-renders
import React, { useEffect, useRef } from 'react';

// (2) imports React Native UI components: 
// • View = basic container
// • Text = displays "Lialune" test
// • StyleSheet = utility for creating optimized styles 
// • Animated = provides animation capabilities (moving, fading, scaling, etc.)
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

// (3) Defines & exports the Startup screen - accepts 'navigation' prop from React Navigation, lets you move between screens
export default function Startup({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // creates animated value, starting from 0 (transparent) - Used to control opacity

  // (4) Runs once after components mounts
  useEffect(() => { 
    // (5) Start chain of animation sequences back-to-back
    Animated.sequence([
      
      Animated.timing(fadeAnim, { // fadeAnim from 0 to 1 (transparent -> visible)
        toValue: 1,
        duration: 800, // in milliseconds 
        useNativeDriver: true, // enables better performance via native animation thread
      }),

      Animated.delay(2000), // Pause animation for 2 seconds
      
      Animated.timing(fadeAnim, { // fadeAnim from 1 to 0 (visible -> transparent)
        toValue: 0,
        duration: 700, // in milliseconds 
        useNativeDriver: true,
      }),
    ]).start(() => navigation.replace('Home')); // (6) after animation sequences, replaces current screen with Home screen - with .replace() instead of .navigate() ensures Startup isnt left in the back stack
  }, []); // (7) empty array ensures animation runs only once when the screen first loads

  // (8) Renders the Screen
  // * animated view properties & opacity
  // * apply styles to Logo
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
      <Text style={styles.logo}>lialune</Text>
    </Animated.View>
  );
}

// (9) Styles Block
const styles = StyleSheet.create({
  container: {
    flex: 1, // full screen height & width
    backgroundColor: '#D6EDFF', // Background color (Soft Sky Blue)
    justifyContent: 'center', // centers Vertically
    alignItems: 'center', // centers Horizontally 
    paddingBottom: Dimensions.get('window').height * 0.12,
  },
  logo: {
    fontSize: 48,
    fontWeight: '400',
    fontFamily: 'Italiana', // Lialune Font 
    color: '#0068B8', // color of Soluna Logo (Deep Cool Blue)
    textTransform: 'lowercase', // makes it stay lowercase
    letterSpacing: 1, // a bit of room between the letters
  },
});