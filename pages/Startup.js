import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

export default function Startup({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.replace('Home'));
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.logo}>lialune</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE7F6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Dimensions.get('window').height * 0.12,
  },
  logo: {
    fontSize: 48,
    fontFamily: 'Italiana',
    color: '#125DAB',
    textTransform: 'lowercase',
    letterSpacing: 1,
  },
});