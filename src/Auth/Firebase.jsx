import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuEA5XWcIBeIzeA9Hz9Q6x_O84s9Xppr0",
  authDomain: "mytalantum.firebaseapp.com",
  projectId: "mytalantum",
  storageBucket: "mytalantum.firebasestorage.app",
  messagingSenderId: "882817909151",
  appId: "1:882817909151:web:bae70a566303cd24e0fdaa"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();