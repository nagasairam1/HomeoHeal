// src/screens/SymptomChecker.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import { hybridSuggest, offlineMatch } from "../utils/aiEngine";
import RemedyCard from "../components/RemedyCard";
import { getLanguage } from "../utils/language";

export default function SymptomChecker({ navigation }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [lang, setLang] = useState("en");

  React.useEffect(() => { (async()=> setLang(await getLanguage()))(); }, []);

  async function runSearch() {
    if (!q || q.trim().length < 2) return Alert.alert("Enter symptoms");
    // offline-first
    const offline = offlineMatch(q);
    if (offline && offline.length > 0) {
      setResults(offline.map(r => ({ id: r.id, name: r.name, potency: r.potency, indications_en: "", indications_te: "" })));
      return;
    }
    // attempt hybrid with no API key (will return error) or with env-provided key:
    const key = null; // set env or pass down
    const res = await hybridSuggest(q, key);
    if (res.source === "offline") setResults(res.results);
    else if (res.source === "online" && res.results) setResults(res.results);
    else Alert.alert("No suggestions found");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang === "en" ? "Symptom Checker" : "లక్షణాలు చెకర్"}</Text>
      <SearchBar value={q} onChange={setQ} placeholder={lang === "en" ? "Describe your symptoms..." : "మీ లక్షణాలు వివరించండి..."} />
      <TouchableOpacity style={styles.btn} onPress={runSearch}><Text style={{color:'#fff'}}>Check</Text></TouchableOpacity>

      <FlatList data={results} keyExtractor={(i,idx)=> i.id || String(idx)} renderItem={({ item }) => (
        <RemedyCard remedy={item} lang={lang} onPress={() => navigation.navigate("Details", { id: item.id })} />
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12, backgroundColor:"#F7FFF7" },
  title: { fontSize:20, fontWeight:"700", color:"#2E7D32", marginBottom:8 },
  btn: { backgroundColor:"#2E7D32", padding:12, borderRadius:8, alignItems:"center", marginBottom:12 }
});
