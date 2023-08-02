// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeTELx4b_bJXT1h6Q8QJQtu2olOSnBPfg",
  authDomain: "coffee-logging-app.firebaseapp.com",
  projectId: "coffee-logging-app",
  storageBucket: "coffee-logging-app.appspot.com",
  messagingSenderId: "278483837472",
  appId: "1:278483837472:web:62baa0d0203d4fa303d245",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
