import {initializeApp} from "firebase/app";
import "firebase/database";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyLGjJpHIBHEELKMZnuGVW0QJpxsvL0dg",
  authDomain: "llmpilot.firebaseapp.com",
  databaseURL: "https://llmpilot-default-rtdb.firebaseio.com/",
  projectId: "llmpilot",
  storageBucket: "llmpilot.appspot.com",
  messagingSenderId: "322757650434",
  appId: "1:322757650434:web:115ec67eba29080d4b1f1b",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
