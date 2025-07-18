import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzqRynGVhmyfOU5Embq0XhqMEnJiOwCXk',
  authDomain: 'interviewplatform-ecb76.firebaseapp.com',
  projectId: 'interviewplatform-ecb76',
  storageBucket: 'interviewplatform-ecb76.firebasestorage.app',
  messagingSenderId: '842012159227',
  appId: '1:842012159227:web:22cde3e7635682ec7f145e',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
