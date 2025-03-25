
import React from "react";
import { Platform, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";

// Create a stack navigator
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          {Platform.OS === 'web' ? (
            // Web-specific routing
            <React.Fragment>
              <Navbar />
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Index" component={Index} />
                  <Stack.Screen name="Auth" component={Auth} />
                  <Stack.Screen name="Feed" component={Feed} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen name="NotFound" component={NotFound} />
                </Stack.Navigator>
              </NavigationContainer>
            </React.Fragment>
          ) : (
            // Native-specific routing
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="Index" 
                screenOptions={{ 
                  headerShown: true
                }}
              >
                <Stack.Screen name="Index" component={Index} options={{ title: "Simplicity" }} />
                <Stack.Screen name="Auth" component={Auth} options={{ title: "Authentication" }} />
                <Stack.Screen name="Feed" component={Feed} options={{ title: "Photo Feed" }} />
                <Stack.Screen name="Profile" component={Profile} options={{ title: "Your Profile" }} />
                <Stack.Screen name="NotFound" component={NotFound} options={{ title: "Page Not Found" }} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </View>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
