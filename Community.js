// src/screens/Community.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { initFirebase } from "../firebase";
import { getLanguage } from "../utils/language";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export default function Community() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    (async () => {
      setLang(await getLanguage());
      const { db } = initFirebase();
      if (!db) return;
      const q = query(collection(db, "community"), orderBy("created", "desc"));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  async function post() {
    const { db } = initFirebase();
    if (!db) return Alert.alert("Configure Firebase");
    await addDoc(collection(db, "community"), { text, created: new Date() });
    setText("");
    Alert.alert("Posted");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang==='en' ? "Community" : "సముదాయం"}</Text>
      <TextInput value={text} onChangeText={setText} placeholder={lang==='en'?'Share your story...':'మీ కథని పంచుకోండి...'} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={post}><Text style={{color:'#fff'}}>Post</Text></TouchableOpacity>
      <FlatList data={posts} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.post}><Text>{item.text}</Text></View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:12,backgroundColor:"#F7FFF7"},
  title:{fontSize:20,fontWeight:"700",color:"#2E7D32",marginBottom:8},
  input:{borderWidth:1,padding:10,borderRadius:8,marginBottom:8,backgroundColor:"#fff"},
  btn:{backgroundColor:"#2E7D32",padding:10,alignItems:"center",borderRadius:8,marginBottom:8},
  post:{backgroundColor:"#fff",padding:12,borderRadius:8,marginVertical:6}
});
