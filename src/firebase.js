import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr02K0qGf8PjecAh-slprAKFdBrMf7Bvw",
  authDomain: "personal-website-77f54.firebaseapp.com",
  projectId: "personal-website-77f54",
  storageBucket: "personal-website-77f54.firebasestorage.app",
  messagingSenderId: "351906229944",
  appId: "1:351906229944:web:bd964860a4d2cb51208e4d",
  measurementId: "G-E228Y3E7D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
