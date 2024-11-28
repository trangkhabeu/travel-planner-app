// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIgJvUuagDfLk8oMjh47YphmODMyVVPZ0",
  authDomain: "travel-planner-8379c.firebaseapp.com",
  projectId: "travel-planner-8379c",
  storageBucket: "travel-planner-8379c.firebasestorage.app",
  messagingSenderId: "205810494901",
  appId: "1:205810494901:web:e41bdea69eee53ddcf7dfc",
  measurementId: "G-X8FDGGHQ7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

