// src/screens/NearbyStores.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getCurrentLocationAsync } from "../utils/gps";
import { getLanguage } from "../utils/language";

export default function NearbyStores() {
  const [stores, setStores] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      setLang(await getLanguage());
      const loc = await getCurrentLocationAsync();
      // Placeholder stores — replace by real places API if needed
      setStores([
        { id: "s1", name: "Dattatreya Homeo Store", distance: "0.6 km" },
        { id: "s2", name: "Gayatri Homeo Pharmacy", distance: "1.5 km" }
      ]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang === "en" ? "Nearby Homeo Stores" : "ఎటు సమీప హోమెఓ స్టోర్లు"}</Text>
      <FlatList data={stores} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.card}><Text style={{fontWeight:'700'}}>{item.name}</Text><Text>{item.distance}</Text></View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:12,backgroundColor:"#F7FFF7"},
  title:{fontSize:20,fontWeight:"700",color:"#2E7D32",marginBottom:8},
  card:{backgroundColor:'#fff',padding:12,borderRadius:8,marginVertical:6}
});
