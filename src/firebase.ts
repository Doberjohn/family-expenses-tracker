import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOEpkHQB3c-DeOPzXx24H05tf0VItmvxs',
  authDomain: 'family-expenses-tracker-cf311.firebaseapp.com',
  projectId: 'family-expenses-tracker-cf311',
  storageBucket: 'family-expenses-tracker-cf311.firebasestorage.app',
  messagingSenderId: '717692628273',
  appId: '1:717692628273:web:663bb8b83a305899f5d410',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
