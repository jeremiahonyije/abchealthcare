// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'abchealthcare-5230b.firebaseapp.com',
  projectId: 'abchealthcare-5230b',
  storageBucket: 'abchealthcare-5230b.firebasestorage.app',
  messagingSenderId: '399534522007',
  appId: '1:399534522007:web:d776f89717022cb60ab3d2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
