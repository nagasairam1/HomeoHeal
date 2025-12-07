import AsyncStorage from "@react-native-async-storage/async-storage";
import translations from "../../data/translations.json";

const KEY = "LANG";

export async function setLanguage(lang) {
  await AsyncStorage.setItem(KEY, lang);
}

export async function getLanguage() {
  return (await AsyncStorage.getItem(KEY)) || "en";
}

export function t(key, lang = "en") {
  return translations[lang][key] || translations["en"][key] || key;
}
