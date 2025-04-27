// ----- Previous 'index.js' -----
// import 'react-native-gesture-handler';
// import { registerRootComponent } from 'expo';
// import App from './App';

// registerRootComponent(App);
// -------------------------------
// index.js
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Wrap App manually here:
function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}

registerRootComponent(Main);