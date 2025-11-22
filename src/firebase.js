// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRNugtNO4La6cuxipLkBOJ7LI5lGtS6XY",
  authDomain: "samuel-director-portfolio.firebaseapp.com",
  projectId: "samuel-director-portfolio",
  storageBucket: "samuel-director-portfolio.firebasestorage.app",
  messagingSenderId: "97718176720",
  appId: "1:97718176720:web:1b73f2ce2392defa7047d5",
  measurementId: "G-YJHX88C1NW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);