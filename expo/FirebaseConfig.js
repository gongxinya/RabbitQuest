import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getDatabase, ref, push, serverTimestamp, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDBjUEw_DQNMQsZJWfTtLL0PQJoH-xF0kk",
    authDomain: "sta-cs5041.firebaseapp.com",
    databaseURL: "https://sta-cs5041-p4.firebaseio.com",
    projectId: "sta-cs5041",
    storageBucket: "sta-cs5041.appspot.com",
    messagingSenderId: "639987847762",
    appId: "1:639987847762:web:c5a35616a1aa1cf243458b"
  };

  // const firebaseToken = "YOUR TOKEN HERE";
export const firebaseToken = "9dc08c76-44bb-4e21-976d-6b52df4df0aa";


export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const functions = getFunctions(firebaseApp);