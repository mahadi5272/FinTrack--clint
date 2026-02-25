// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBMH7ssgW89j35TDueM5KRFKAVmJAUC2w",
  authDomain: "fintrack-99ee7.firebaseapp.com",
  projectId: "fintrack-99ee7",
  storageBucket: "fintrack-99ee7.firebasestorage.app",
  messagingSenderId: "746387603672",
  appId: "1:746387603672:web:c1b482f0968fcdb65957ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);