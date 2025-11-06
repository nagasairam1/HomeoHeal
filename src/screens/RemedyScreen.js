import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import remediesData from "../../data/remedies.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RemedyScreen({ route, navigation }) {
  const { remedyId } = route.params;
  const [remedy, setRemedy] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const r = remediesData.find((x) => x.id === remedyId);
    setRemedy(r);
    checkFav();
  }, [remedyId]);

  async function checkFav() {
    try {
      const raw = await AsyncStorage.getItem("favorites");
      const favs = raw ? JSON.parse(raw) : [];
      setFav(favs.includes(remedyId));
    } catch (e) {
      console.warn(e);
    }
  }

  async function toggleFavorite() {
    try {
      const raw = await AsyncStorage.getItem("favorites");
      const favs = raw ? JSON.parse(raw) : [];
      let updated;
      if (favs.includes(remedyId)) {
        updated = favs.filter((id) => id !== remedyId);
        setFav(false);
      } else {
        updated = [remedyId, ...favs];
        setFav(true);
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      Alert.alert("Saved", fav ? "Removed from favorites" : "Added to favorites");
    } catch (e) {
      console.warn(e);
    }
  }

  if (!remedy) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{remedy.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text style={[styles.fav, fav ? { color: "#E74C3C" } : { color: "#999" }]}>{fav ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>{remedy.category}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indications</Text>
        {remedy.indications.map((ind, idx) => (
          <Text key={idx} style={styles.bullet}>• {ind}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Potency & Dosage</Text>
        <Text style={styles.detail}><Text style={{fontWeight:'600'}}>Potency:</Text> {remedy.potency}</Text>
        <Text style={styles.detail}><Text style={{fontWeight:'600'}}>Dosage:</Text> {remedy.dosage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.detail}>{remedy.notes}</Text>
      </View>

      {remedy.precautions ? (
        <View style={[styles.section, { backgroundColor: "#FFF6F6", borderColor: "#F9D6D6" }]}>
          <Text style={styles.sectionTitle}>Precautions</Text>
          <Text style={styles.detail}>{remedy.precautions}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700" },
  fav: { fontSize: 24 },
  category: { color: "#666", marginTop: 6 },
  section: { marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: "#FBFBFB", borderWidth: 1, borderColor: "#EEE" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  bullet: { fontSize: 14, marginVertical: 4, color: "#333" },
  detail: { fontSize: 14, color: "#333", marginVertical: 4 }
});
