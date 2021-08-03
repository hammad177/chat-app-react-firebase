/** @format */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: 'AIzaSyCWP08pCC6CaAHfJrUWqMa0Z_EOYwTZNFo',
  authDomain: 'chat-app-9ba44.firebaseapp.com',
  databaseURL: 'https://chat-app-9ba44.firebaseio.com',
  projectId: 'chat-app-9ba44',
  storageBucket: 'chat-app-9ba44.appspot.com',
  messagingSenderId: '297070820507',
  appId: '1:297070820507:web:8f645eeadf39001e3f1a3e',
  measurementId: 'G-0GMMLD3BRN'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
