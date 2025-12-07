// src/screens/AskDoctorAI.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { hybridSuggest } from "../utils/aiEngine";
import { getLanguage } from "../utils/language";

export default function AskDoctorAI() {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);
  const [lang, setLang] = useState("en");

  React.useEffect(()=>{ (async()=> setLang(await getLanguage()))(); }, []);

  async function ask() {
    if (!q) return;
    setMessages(prev=>[...prev, { from: "user", text: q }]);
    const key = null; // provide OPENAI key to get online suggestions
    const res = await hybridSuggest(q, key);
    if (res && res.results) {
      setMessages(prev=>[...prev, { from: "bot", text: JSON.stringify(res.results, null, 2) }]);
    } else {
      setMessages(prev=>[...prev, { from: "bot", text: "No suggestions found" }]);
    }
    setQ("");
  }

  return (
    <View style={styles.container}>
      <FlatList data={messages} keyExtractor={(i,idx)=>String(idx)} renderItem={({item})=>(
        <View style={[styles.msg, item.from==='user'?styles.user:styles.bot]}><Text>{item.text}</Text></View>
      )} />
      <TextInput value={q} onChangeText={setQ} placeholder={lang==='en'?'Ask your health question...':'మీ ఆరోగ్య ప్రశ్న అడగండి...'} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={ask}><Text style={{color:'#fff'}}>Ask</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:12, backgroundColor:"#F7FFF7"},
  input:{borderWidth:1,padding:10,borderRadius:8,marginBottom:8},
  btn:{backgroundColor:"#2E7D32",padding:12,alignItems:"center",borderRadius:8},
  msg:{padding:10,marginVertical:6,borderRadius:8},
  user:{alignSelf:"flex-end",backgroundColor:"#E8F5E9"},
  bot:{alignSelf:"flex-start",backgroundColor:"#fff"}
});
