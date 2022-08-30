// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBF7MIAtW6BGwhegI9-sXkPlnh57gUmRsg',
  authDomain: 'house-marketplace-a0e4b.firebaseapp.com',
  projectId: 'house-marketplace-a0e4b',
  storageBucket: 'house-marketplace-a0e4b.appspot.com',
  messagingSenderId: '91125148402',
  appId: '1:91125148402:web:e2e1afb262111e07637e6b'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
