import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK9ffTpeSlQOGuTrKTDefXU-i_HvyvNXo",
  authDomain: "hobbyhub-orbital.firebaseapp.com",
  projectId: "hobbyhub-orbital",
  storageBucket: "hobbyhub-orbital.appspot.com",
  messagingSenderId: "972393488330",
  appId: "1:972393488330:web:c8624c0883f9d708847933",
  measurementId: "G-TBRFM8SGGS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
