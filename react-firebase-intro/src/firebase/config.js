import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBN9L493FKEjRYQClMqcDq1TiiSMZGf8JI",
    authDomain: "fir-intro-ec022.firebaseapp.com",
    projectId: "fir-intro-ec022",
    storageBucket: "fir-intro-ec022.appspot.com",
    messagingSenderId: "533877694807",
    appId: "1:533877694807:web:b7fa3aa1e069f471179e12"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
