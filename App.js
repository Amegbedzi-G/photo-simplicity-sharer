
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import MainApp from './src/App';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// This is a compatibility layer for Expo
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Prepare the app
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.wrapper}>
          <MainApp />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
