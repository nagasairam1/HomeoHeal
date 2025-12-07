// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import RemedyCard from "../components/RemedyCard";
import remedies from "../../data/remedies.json";
import LanguageToggle from "../components/LanguageToggle";
import { getLanguage } from "../utils/language";

export default function HomeScreen({ navigation }) {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      const l = await getLanguage();
      setLang(l);
      setList(remedies.slice(0, 60));
    })();
  }, []);

  function onSearch(text) {
    setQ(text);
    const s = text.toLowerCase();
    const results = remedies.filter(r =>
      (r.name || "").toLowerCase().includes(s) ||
      (r.indications_en || "").toLowerCase().includes(s) ||
      (r.indications_te || "").toLowerCase().includes(s)
    ).slice(0, 100);
    setList(results);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HomeoHeal</Text>
        <LanguageToggle />
      </View>

      <SearchBar value={q} onChange={onSearch} placeholder={lang === "en" ? "Search symptoms or remedies..." : "లక్షణాలు లేదా మందులు శోధించండి..."} />

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <RemedyCard
            remedy={item}
            lang={lang}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F7FFF7" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "800", color: "#2E7D32" }
});
