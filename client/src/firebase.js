// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-pg.firebaseapp.com",
  projectId: "estate-pg",
  storageBucket: "estate-pg.appspot.com",
  messagingSenderId: "714945718222",
  appId: "1:714945718222:web:9191c9694bd80a0f322d9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);