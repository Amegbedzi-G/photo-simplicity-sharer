
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import MainApp from './src/App';

// This is a compatibility layer for Expo Snack
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapper}>
        <MainApp />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
});
