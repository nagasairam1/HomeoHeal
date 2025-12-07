// src/screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { initFirebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function register() {
    const { auth } = initFirebase();
    if (!auth) return Alert.alert("Firebase not configured");
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      Alert.alert("Account created");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Registration failed", String(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
      <TextInput value={pass} onChangeText={setPass} placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={register}><Text style={{color:'#fff'}}>Create</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:12,backgroundColor:"#F7FFF7"},
  title:{fontSize:22,fontWeight:'700',color:'#2E7D32',marginBottom:12},
  input:{borderWidth:1,padding:10,borderRadius:8,backgroundColor:'#fff',marginBottom:8},
  btn:{backgroundColor:'#2E7D32',padding:12,alignItems:'center',borderRadius:8}
});
