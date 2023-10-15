import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyBxQ2QxWXu3wIdercIR1uevcVOZyPE9gWc",
  authDomain: "imagestore-8635a.firebaseapp.com",
  projectId: "imagestore-8635a",
  storageBucket: "imagestore-8635a.appspot.com",
  messagingSenderId: "804414393725",
  appId: "1:804414393725:web:d98a3330443fcc78e1d014"
};

// Initialise the Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app); // Add this line to export auth
