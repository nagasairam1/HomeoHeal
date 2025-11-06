import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import RemedyCard from "../components/RemedyCard";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import remediesData from "../../data/remedies.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadLocal() {
      try {
        const raw = await AsyncStorage.getItem('remote_remedies');
        if (raw) {
          setFiltered(JSON.parse(raw));
          return;
        }
      } catch(e){}
      setFiltered(remediesData);
    }
    loadLocal();
  }, []);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setFiltered(remediesData);
      return;
    }
    setLoading(true);
    const q = query.toLowerCase().trim();
    const res = remediesData.filter((r) => {
      const inName = r.name.toLowerCase().includes(q);
      const inCategory = r.category?.toLowerCase().includes(q);
      const inIndications = r.indications?.some((ind) => ind.toLowerCase().includes(q));
      return inName || inCategory || inIndications;
    });
    const tokens = q.split(/\s+/);
    const boosted = remediesData.filter((r) => {
      const hay = (r.name + " " + r.indications.join(" ") + " " + r.category).toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
    const combined = Array.from(new Set([...boosted, ...res]));
    setFiltered(combined);
    setLoading(false);
  }, [query]);

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Type symptom, e.g., 'headache', 'diarrhea'..." />
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{filtered.length} remedies</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.link}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RemedyCard
              remedy={item}
              onPress={() => navigation.navigate("Remedy", { remedyId: item.id })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F8F8F8" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 8 },
  metaText: { fontSize: 14, color: "#333" },
  link: { color: "#2E86AB", fontSize: 14 }
});
