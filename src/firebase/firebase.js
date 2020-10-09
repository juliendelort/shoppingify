import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
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

export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebase.auth());
export default firebase;