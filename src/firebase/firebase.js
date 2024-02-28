import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkRLN2x_Nr9CzAMV-bwARQFAbTKC1J0pg",
  authDomain: "intelligence-alert.firebaseapp.com",
  projectId: "intelligence-alert",
  storageBucket: "intelligence-alert.appspot.com",
  messagingSenderId: "640747516004",
  appId: "1:640747516004:web:d463a6682306f808e6af71",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
