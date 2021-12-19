import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD0XI2O_m9oWvfnmlcNJG1D_2yeuKRUAzM",
  authDomain: "todoistapps.firebaseapp.com",
  databaseURL: "https://todoistapps-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todoistapps",
  storageBucket: "todoistapps.appspot.com",
  messagingSenderId: "1008122669370",
  appId: "1:1008122669370:web:555556c768c7d71c4d8803",
  measurementId: "G-BFVB8SF7ZS"
});

export { firebaseConfig as firebase };