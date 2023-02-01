// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0hqyGhW1TM93sNlK45vAY-Zq8v6YQXwI",
  authDomain: "grayphiteecommerce.firebaseapp.com",
  projectId: "grayphiteecommerce",
  storageBucket: "grayphiteecommerce.appspot.com",
  messagingSenderId: "857130565109",
  appId: "1:857130565109:web:86c3b5ede79db2ac5974bc",
  measurementId: "G-RSRFSRNYC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;