// src/screens/FavoritesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import remedies from "../../data/remedies.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RemedyCard from "../components/RemedyCard";
import { getLanguage } from "../utils/language";

export default function FavoritesScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      setLang(await getLanguage());
      const keys = await AsyncStorage.getAllKeys();
      const favIds = keys.filter(k => k.startsWith("fav_")).map(k => k.replace("fav_", ""));
      const items = remedies.filter(r => favIds.includes(r.id));
      setList(items);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang === "en" ? "Favorites" : "ఫేవరెట్స్"}</Text>
      <FlatList data={list} keyExtractor={i => i.id} renderItem={({ item }) => (
        <RemedyCard remedy={item} lang={lang} onPress={() => navigation.navigate("Details", { id: item.id })} />
      )} ListEmptyComponent={<Text style={{marginTop:20}}>No favorites yet</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F7FFF7" },
  title: { fontSize: 20, fontWeight: "700", color: "#2E7D32", marginBottom: 8 }
});
