// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStoreage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg2Xrbz-nXQSjqYjOysfAy_K5cC_w9WLI",
  authDomain: "mp-react-native.firebaseapp.com",
  projectId: "mp-react-native",
  storageBucket: "mp-react-native.appspot.com",
  messagingSenderId: "872935120832",
  appId: "1:872935120832:web:1951853a597f78dec53225",
  measurementId: "G-QL9PRS6NMD"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStoreage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIRBASE_STORAGE = getStorage(FIREBASE_APP);