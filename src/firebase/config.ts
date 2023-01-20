import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCCGYug35uJBZYKdbqSur_Fg1Zjzj472LM',
  authDomain: 'shrinker-3ddda.firebaseapp.com',
  databaseURL: 'https://shrinker-3ddda.firebaseio.com',
  projectId: 'shrinker-3ddda',
  storageBucket: 'shrinker-3ddda.appspot.com',
  messagingSenderId: '207240240380',
  appId: '1:207240240380:web:6e677f3d37fb07cf17cb79',
  measurementId: 'G-FZWVFL3W1G',
});

const firestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp };
