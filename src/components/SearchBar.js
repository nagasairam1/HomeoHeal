import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.searchBox}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Search..."}
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: { backgroundColor: "#fff", padding: 8, borderRadius: 10, borderWidth: 1, borderColor: "#EEE" },
  input: { fontSize: 16, padding: 8 }
});
