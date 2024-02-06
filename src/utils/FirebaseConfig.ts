// src/utils/FirebaseConfig.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMyD9saNnFx5soZY54VF76TzfdrKlPR84",
  authDomain: "pokemon-redux-bb1d1.firebaseapp.com",
  projectId: "pokemon-redux-bb1d1",
  storageBucket: "pokemon-redux-bb1d1.appspot.com",
  messagingSenderId: "558442596744",
  appId: "1:558442596744:web:683e913d96fdbadb57523d",
  measurementId: "G-2TKWHJ9KME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

// firebaseのコレクション(mySqlのテーブルのようなもの)
export const userRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");