import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Lialune</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF8F4', // Background Color (Light Cream Color)
  },
  text: {
    fontSize: 24,
    fontFamily: 'Italiana_400Regular',
    color: '#1A3C70',
  },
});