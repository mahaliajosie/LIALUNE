import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Italiana } from '@expo-google-fonts/italiana';
import AppLoading from 'expo-app-loading';

import Startup from 'pages/Startup.js';
import Home from 'pages/Home.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Italiana,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}