
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDocs } from "firebase/firestore"; 
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdUpsbSq3uJZEiUy_OFbSg5sxNLPZizlk",
  authDomain: "expense-app-8d2c9.firebaseapp.com",
  projectId: "expense-app-8d2c9",
  storageBucket: "expense-app-8d2c9.appspot.com",
  messagingSenderId: "959603679558",
  appId: "1:959603679558:web:7299dbfcef4bd994958547"
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  const auth = getAuth(app);

  export {db,collection, addDoc,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, doc, getDocs  };