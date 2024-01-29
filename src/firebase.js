import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEO_paFgTd8Fti0-jqAokiwDlNRTP08to",
  authDomain: "react-vite-router.firebaseapp.com",
  projectId: "react-vite-router",
  storageBucket: "react-vite-router.appspot.com",
  messagingSenderId: "866798647169",
  appId: "1:866798647169:web:fe31d9df4c5a8e5bcada80",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
