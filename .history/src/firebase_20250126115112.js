// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXDwR97pYA-nHXGBucOwJAU6dWmRmoUk0",
  authDomain: "recipe-era.firebaseapp.com",
  projectId: "recipe-era",
  storageBucket: "recipe-era.firebasestorage.app",
  messagingSenderId: "387717403662",
  appId: "1:387717403662:web:76abe252fb602e54b8985f",
  measurementId: "G-V8V1WJ3R83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);