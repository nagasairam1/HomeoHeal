import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, AccessibilityInfo } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Props:
 *  - remedy: { id, name, category, indications (array), potency, potency_display, indications_en, indications_te }
 *  - onPress: function
 *  - lang: 'en' | 'te' (optional, fallback to 'en')
 */
export default function RemedyCard({ remedy, onPress, lang = "en" }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(`fav_${remedy.id}`).then(v => {
      if (mounted) setFav(!!v);
    });
    return () => (mounted = false);
  }, [remedy.id]);

  async function toggleFav() {
    try {
      if (fav) {
        await AsyncStorage.removeItem(`fav_${remedy.id}`);
        setFav(false);
      } else {
        await AsyncStorage.setItem(`fav_${remedy.id}`, "1");
        setFav(true);
      }
    } catch (e) {
      console.warn("fav toggle error", e);
    }
  }

  const indicationsText = (() => {
    if (lang === "te") {
      return (remedy.indications_te || remedy.indications_en || remedy.indications || [])
        .slice(0, 3)
        .join(", ");
    }
    return (remedy.indications_en || remedy.indications || [])
      .slice(0, 3)
      .join(", ");
  })();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${remedy.name} ${remedy.category}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{remedy.name}</Text>
        <Text style={styles.cat}>{remedy.category}</Text>
        <Text style={styles.snippet} numberOfLines={2}>{indicationsText}</Text>
      </View>

      <View style={styles.right}>
        <View style={styles.potencyWrap}>
          <Text style={styles.potency}>{remedy.potency || remedy.potency_display || "30C"}</Text>
        </View>

        <TouchableOpacity onPress={toggleFav} style={styles.favBtn} accessibilityRole="button" accessibilityLabel={fav ? "Remove from favorites" : "Add to favorites"}>
          <Text style={[styles.favText, fav && styles.favActive]}>{fav ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center"
  },
  pressed: {
    opacity: 0.9
  },
  left: {
    flex: 1,
    paddingRight: 8
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2e7d32" // medical green headline
  },
  cat: {
    fontSize: 12,
    color: "#777",
    marginTop: 4
  },
  snippet: {
    fontSize: 13,
    color: "#444",
    marginTop: 8
  },
  right: {
    width: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  potencyWrap: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8
  },
  potency: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "700"
  },
  favBtn: {
    padding: 4
  },
  favText: {
    fontSize: 18,
    color: "#888"
  },
  favActive: {
    color: "#e91e63"
  }
});
