// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA55as-ghMepzgvZAW0wtXoLdf0TwO8fPY",
  authDomain: "fir-todo-30e67.firebaseapp.com",
  projectId: "fir-todo-30e67",
  storageBucket: "fir-todo-30e67.appspot.com",
  messagingSenderId: "742082887983",
  appId: "1:742082887983:web:8230bd70d33b0e4165e1da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);