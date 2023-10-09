import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

//firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyBxQ2QxWXu3wIdercIR1uevcVOZyPE9gWc",
  authDomain: "imagestore-8635a.firebaseapp.com",
  projectId: "imagestore-8635a",
  storageBucket: "imagestore-8635a.appspot.com",
  messagingSenderId: "804414393725",
  appId: "1:804414393725:web:d98a3330443fcc78e1d014"
};


//initialise the firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);