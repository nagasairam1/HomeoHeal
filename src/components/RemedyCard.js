import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RemedyCard({ remedy, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{flex:1}}>
        <Text style={styles.name}>{remedy.name}</Text>
        <Text style={styles.cat}>{remedy.category}</Text>
        <Text numberOfLines={2} style={styles.snippet}>
          {remedy.indications.slice(0,3).join(", ")}
        </Text>
      </View>
      <View style={{justifyContent:'center'}}>
        <Text style={styles.potency}>{remedy.potency}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#EEE" },
  name: { fontSize: 16, fontWeight: "700" },
  cat: { fontSize: 12, color: "#777", marginTop: 4 },
  snippet: { fontSize: 13, color: "#444", marginTop: 8 },
  potency: { fontSize: 12, color: "#2E86AB", fontWeight: "700" }
});
