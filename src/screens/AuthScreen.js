import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState('login');

  async function submit() {
    try {
      if(mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, pass);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
      navigation.replace('Home');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'signup' ? 'Create account' : 'Login'}</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" style={styles.input} />
      <TextInput value={pass} onChangeText={setPass} placeholder="Password" secureTextEntry style={styles.input} />
      <Button title={mode === 'signup' ? 'Sign up' : 'Sign in'} onPress={submit} />
      <Button title={mode === 'signup' ? 'Have an account? Login' : 'Create account'} onPress={() => setMode(mode === 'signup' ? 'login' : 'signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding:20, flex:1, justifyContent:'center'},
  title: {fontSize:20, marginBottom:12},
  input: {borderWidth:1, borderColor:'#ddd', padding:10, marginBottom:12, borderRadius:6}
});
