// firebase/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// เอา config ที่มีมาใส่ตรงนี้
const firebaseConfig = {
  apiKey: "AIzaSyCDm_zmY3ILrtfAWHozT1msq-u1lVNISYs",
  authDomain: "book-store-efdd9.firebaseapp.com",
  projectId: "book-store-efdd9",
  storageBucket: "book-store-efdd9.firebasestorage.app",
  messagingSenderId: "93304152441",
  appId: "1:93304152441:web:b1563a7f61f1e449738fa8",
  measurementId: "G-3L556SP9B3",
};

// ให้แน่ใจว่า app ถูก initialize แค่ครั้งเดียว
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// สร้าง instance ของ Realtime Database
const database = getDatabase(app);

// export ออกไปให้ไฟล์อื่นใช้
export { app, database };