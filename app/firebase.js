import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyDuKDuiLNjeZJ9kDLBUwZ6MM9oC5Vl1Tv8",
    authDomain: "klp-hw.firebaseapp.com",
    projectId: "klp-hw",
    storageBucket: "klp-hw.appspot.com",
    messagingSenderId: "267241884107",
    appId: "1:267241884107:ios:4e15836b10a4c4a5224e4e",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);