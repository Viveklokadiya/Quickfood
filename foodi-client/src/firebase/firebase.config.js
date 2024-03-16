// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYpTNHC41-uro2fjX9nQgZ8_j8JDZJ2LA",
  authDomain: "foodi-client-demoo.firebaseapp.com",
  projectId: "foodi-client-demoo",
  storageBucket: "foodi-client-demoo.appspot.com",
  messagingSenderId: "319256370970",
  appId: "1:319256370970:web:d6282b1f6f8c84232916a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;