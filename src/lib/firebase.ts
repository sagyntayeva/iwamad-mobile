import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCXjQ2nDfKxEUp41ehJc4gCwE05_xlY76Q',
  authDomain: 'iwamad-chat-edf03.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-edf03-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-edf03',
  storageBucket: 'iwamad-chat-edf03.firebasestorage.app',
  messagingSenderId: '682621815684',
  appId: '1:682621815684:web:223d6b9ab9f91585f86bd1',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
