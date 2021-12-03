// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA239olBl4lIMgULvdUr2lCsriqpPgl1yg",
  authDomain: "treasure-hunt-29cba.firebaseapp.com",
  projectId: "treasure-hunt-29cba",
  storageBucket: "treasure-hunt-29cba.appspot.com",
  messagingSenderId: "568140232935",
  appId: "1:568140232935:web:42324db286a7c519094a42",
  measurementId: "G-7802P8NJ1B"
};

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

export const app = firebaseApp;
export const auth = getAuth(app);
export const database = getDatabase(app)