// -----------------------------------------------------------------------
// ----------------- Main Tabs for the bottom navigation -----------------
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

import Home from '../pages/Home';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

// Defines tab bar at the bottom of the screen
export default function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({ // Grabs the "route" (screen name) to customize each page's appearance
          headerShown: false, // hides top header bar for each screen (disables the default)
          // Tab Bar appearance
          tabBarStyle: { 
            backgroundColor: colors.bottomKhaki,
            borderTopWidth: 0, // removes the default top border line on tab bar, cleans the look 
          },
          // Defines Icons in Tab Bar
          tabBarIcon: ({ color, size }) => { 
            let iconName = route.name === 'Home' ? 'home' : 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primaryDeepBlue,  // Active = Dark Blue
          tabBarInactiveTintColor: colors.inactiveBlue,   // Inactive = Light Blue 
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }