import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { COLORS } from './src/utils/constants';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <HomeScreen />
    </SafeAreaView>
  );
}
