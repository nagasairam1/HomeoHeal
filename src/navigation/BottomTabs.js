import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SymptomChecker from "../screens/SymptomChecker";
import FavoritesScreen from "../screens/FavoritesScreen";
import Community from "../screens/Community";
import NearbyStores from "../screens/NearbyStores";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Symptoms" component={SymptomChecker} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Stores" component={NearbyStores} />
    </Tab.Navigator>
  );
}
