import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

var firebaseConfig = {
  apiKey: "AIzaSyBqentZV9dfBYqROdnhu8tdn7TpnZYkNBE",
  authDomain: "shoppingify-bbf33.firebaseapp.com",
  databaseURL: "https://shoppingify-bbf33.firebaseio.com",
  projectId: "shoppingify-bbf33",
  storageBucket: "shoppingify-bbf33.appspot.com",
  messagingSenderId: "946102668655",
  appId: "1:946102668655:web:ce8f60ee9d0e3bec5b2c9a",
  measurementId: "G-XP4V5W8HL5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const FireBaseUIContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <FireBaseUIContext.Provider value={new firebaseui.auth.AuthUI(firebase.auth())}>
      <App />
    </FireBaseUIContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
