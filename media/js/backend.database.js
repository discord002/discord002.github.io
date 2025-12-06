// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASJwP_n6DcvfACpEla9L8qpMApp1f5_l4",
  authDomain: "discord002-e78f0.firebaseapp.com",
  databaseURL: "https://discord002-e78f0-default-rtdb.firebaseio.com",
  projectId: "discord002-e78f0",
  storageBucket: "discord002-e78f0.firebasestorage.app",
  messagingSenderId: "232259988836",
  appId: "1:232259988836:web:9ef0dcf4af872ef3965e71",
  measurementId: "G-XEX6W5FSCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
