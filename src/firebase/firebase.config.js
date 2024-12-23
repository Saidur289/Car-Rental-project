// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh3U8-HGSMaHDBKkZe-LGafoU3bEvwgAI",
  authDomain: "car-rental-project-60409.firebaseapp.com",
  projectId: "car-rental-project-60409",
  storageBucket: "car-rental-project-60409.firebasestorage.app",
  messagingSenderId: "1003711532946",
  appId: "1:1003711532946:web:dcc4d749620ffb44bcbb4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export  const auth = getAuth(app);
