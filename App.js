import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RemedyScreen from "./src/screens/RemedyScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import AuthScreen from "./src/screens/AuthScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "HomeoHeal" }} />
          <Stack.Screen name="Remedy" component={RemedyScreen} options={{ title: "Remedy Details" }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Favorites" }} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ title: "Sign in" }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
