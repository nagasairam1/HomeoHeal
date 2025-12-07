// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth/react-native";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// <-- paste your Firebase config values here
const firebaseConfig = {
  apiKey: "<FIREBASE_API_KEY>",
  authDomain: "<FIREBASE_AUTH_DOMAIN>",
  projectId: "<FIREBASE_PROJECT_ID>",
  storageBucket: "<FIREBASE_STORAGE_BUCKET>",
  messagingSenderId: "<FIREBASE_MESSAGING_SENDER_ID>",
  appId: "<FIREBASE_APP_ID>"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // if app already initialized in hot reload, reuse it
  // console.log("firebase init:", e.message);
  app = initializeApp(firebaseConfig);
}

// Firestore (optional)
let db;
try {
  db = getFirestore(app);
} catch (e) {
  // ignore in dev hot reload
  db = getFirestore(app);
}

// IMPORTANT: initializeAuth with React Native persistence
let auth;
try {
  // use the react-native-specific entrypoint and AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  // in case of hot reload, reuse if it exists
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export function initFirebase() {
  return { app, auth, db };
}
