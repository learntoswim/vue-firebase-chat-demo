import * as firebase from 'firebase';

const config = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR AUTH DOMAIN',
  databaseURL: 'YOUR DATABSE URL',
  projectId: 'YOUR PROJECT ID',
  storageBucket: 'YOUR STORAGE BUCKET',
  messagingSenderId: 'YOUR MESSAGING SENDER ID',
};

firebase.initializeApp(config);

export default firebase.database();
