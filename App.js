// ===========================================================
// ======================= LIALUNE App =======================
// ===========================================================
// - Controls all screens related to the Lialune App 
// - Loads fonts, icons, & navigation between pages
// -----------------------------------------------------------

// IMPORTS
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Italiana_400Regular } from '@expo-google-fonts/italiana';
import { Gantari_500Medium } from '@expo-google-fonts/gantari';
import { Gantari_400Regular } from '@expo-google-fonts/gantari';
import { RammettoOne_400Regular } from '@expo-google-fonts/rammetto-one';
import { Ionicons } from '@expo/vector-icons';

// SCREENS
import Startup from './pages/Startup';
import Home from './pages/Home';
import Profile from './pages/Profile';

// Create stack & tab navigator objects, to define screen transitions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Defines tab bar at the bottom of the screen
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ // Grabs the "route" (screen name) to customize each page's appearance
        headerShown: false, // hides top header bar for each screen (disables the default)
        // Tab Bar appearance
        tabBarStyle: { 
          backgroundColor: '#E2D0B6',
          borderTopWidth: 0, // removes the default top border line on tab bar, cleans the look 
        },
        // Defines Icons in Tab Bar
        tabBarIcon: ({ color, size }) => { 
          let iconName = route.name === 'Home' ? 'home' : 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0068B8', // Active = Dark Blue
        tabBarInactiveTintColor: '#D6EDFF', // Inactive = Light Blue 
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// Main App Function
// - everything is initialized: screens, fonts, navigation, etc. 
export default function App() {
  // Load Fonts ('fontsLoaded' is a boolean)
  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
    RammettoOne_400Regular,
    Gantari_500Medium,
    Gantari_400Regular,
  });

  if (!fontsLoaded) {
    // If fonts do not load, then display a temp screen with a loading spinner
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#70C1FF" /> 
        <Text>Loading. . .</Text>
      </View>
    );
  }

  // Main UI Return: 
  // - 'NavigationContainer' = outer wrapper, enables navigation in app
  // - 'Stack.Navigator' = sets up a stack navigation sturcture & 'headerShown: false' = hides default navigation bar at the top
  // - 'Stack.Screen' = defines the screens in the app 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}