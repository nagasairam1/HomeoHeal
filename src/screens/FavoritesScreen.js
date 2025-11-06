import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import remediesData from "../../data/remedies.json";
import RemedyCard from "../components/RemedyCard";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      loadFavs();
    });
    loadFavs();
    return unsub;
  }, [navigation]);

  async function loadFavs() {
    const raw = await AsyncStorage.getItem("favorites");
    const favs = raw ? JSON.parse(raw) : [];
    const items = favs.map((id) => remediesData.find((r) => r.id === id)).filter(Boolean);
    setFavorites(items);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RemedyCard remedy={item} onPress={() => navigation.navigate("Remedy", { remedyId: item.id })} />}
        ListEmptyComponent={<Text style={{marginTop:20, color:'#666'}}>No favorites yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F8F8F8" },
  heading: { fontSize: 20, fontWeight: "700", marginVertical: 8 }
});
