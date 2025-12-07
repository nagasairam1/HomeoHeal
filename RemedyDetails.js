// src/screens/RemedyDetails.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import remedies from "../../data/remedies.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLanguage } from "../utils/language";
import { initFirebase } from "../firebase"; // optional

export default function RemedyDetails({ route, navigation }) {
  const { id } = route.params || {};
  const [remedy, setRemedy] = useState(null);
  const [fav, setFav] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      const l = await getLanguage();
      setLang(l);
      const r = remedies.find(x => x.id === id);
      setRemedy(r || null);
      const v = await AsyncStorage.getItem("fav_" + id);
      setFav(!!v);
    })();
  }, [id]);

  async function toggleFav() {
    try {
      if (fav) {
        await AsyncStorage.removeItem("fav_" + id);
        setFav(false);
        Alert.alert("Removed from favorites");
      } else {
        await AsyncStorage.setItem("fav_" + id, "1");
        setFav(true);
        Alert.alert("Added to favorites");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  if (!remedy) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{remedy.name}</Text>
      <Text style={styles.category}>{remedy.category}</Text>

      <Section title={lang === "en" ? "Indications" : "లక్షణాలు"}>
        <Text>{lang === "en" ? remedy.indications_en || remedy.indications?.join(", ") : remedy.indications_te || remedy.indications?.join(", ")}</Text>
      </Section>

      <Section title={lang === "en" ? "Potency" : "పోటెన్సి"}>
        <Text>{remedy.potency || remedy.potency_display || "30C"}</Text>
      </Section>

      <Section title={lang === "en" ? "Dosage" : "మోతాదు"}>
        <Text>{lang === "en" ? remedy.dosage_en || remedy.dosage : remedy.dosage_te || remedy.dosage}</Text>
      </Section>

      <Section title={lang === "en" ? "Notes" : "గమనికలు"}>
        <Text>{lang === "en" ? remedy.notes_en || remedy.notes : remedy.notes_te || remedy.notes}</Text>
      </Section>

      <Section title={lang === "en" ? "Precautions" : "జాగ్రత్తలు"}>
        <Text>{lang === "en" ? remedy.precautions_en || remedy.precautions : remedy.precautions_te || remedy.precautions}</Text>
      </Section>

      <TouchableOpacity style={styles.favBtn} onPress={toggleFav}>
        <Text style={styles.favText}>{fav ? "Remove from Favorites" : "Add to Favorites"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ fontWeight: "700", marginBottom: 6 }}>{title}</Text>
      <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#F7FFF7" },
  title: { fontSize: 22, fontWeight: "800", color: "#2E7D32" },
  category: { color: "#777", marginTop: 4 },
  favBtn: { marginTop: 18, padding: 12, backgroundColor: "#2E7D32", borderRadius: 8, alignItems: "center" },
  favText: { color: "#fff", fontWeight: "700" }
});
