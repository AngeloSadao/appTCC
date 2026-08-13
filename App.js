import React from 'react';
import Routes from './src/routes';

import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.innerHTML = `
    html, body, #root {
      height: 100%;
    }
    body {
      overflow: visible !important;
    }
  `;
  document.head.appendChild(style);
}

export default function App() {

  const [fontsLoaded] = useFonts({
    Gurajada: require('./assets/fonts/Gurajada-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  <NavigationContainer>
    <Routes/>
  </NavigationContainer>
    );
}