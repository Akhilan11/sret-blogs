import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDazqy3S6SHqk1GKowpPqG-VSeilVMT1kk",
  authDomain: "sret-blogs.firebaseapp.com",
  projectId: "sret-blogs",
  storageBucket: "sret-blogs.appspot.com",
  messagingSenderId: "480519366827",
  appId: "1:480519366827:web:3c1e02bb482c056a25afee",
  measurementId: "G-P0L48HMPED"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
