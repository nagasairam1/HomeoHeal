import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { getLanguage, setLanguage } from "../utils/language";

export default function LanguageToggle() {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    (async () => {
      setLangState(await getLanguage());
    })();
  }, []);

  async function toggle() {
    const newLang = lang === "en" ? "te" : "en";
    await setLanguage(newLang);
    setLangState(newLang);
  }

  return (
    <TouchableOpacity
      onPress={toggle}
      style={{ padding: 10, borderWidth: 1, borderRadius: 8 }}
    >
      <Text>{lang === "en" ? "EN" : "తెలుగు"}</Text>
    </TouchableOpacity>
  );
}
