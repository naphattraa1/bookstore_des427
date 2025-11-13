// components/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDm_zmY3ILrtfAWHozT1msq-u1lVNISYs",
  authDomain: "book-store-efdd9.firebaseapp.com",
  projectId: "book-store-efdd9",
  storageBucket: "book-store-efdd9.firebasestorage.app",
  messagingSenderId: "93304152441",
  appId: "1:93304152441:web:b1563a7f61f1e449738fa8",
  measurementId: "G-3L556SP9B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { database };