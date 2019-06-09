import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAEdad3eLq4TwTAzWJy5GuICuG4HGWvIOE",
  authDomain: "burger-queen-ks.firebaseapp.com",
  databaseURL: "https://burger-queen-ks.firebaseio.com",
  projectId: "burger-queen-ks",
  storageBucket: "burger-queen-ks.appspot.com",
  messagingSenderId: "203511956132",
  appId: "1:203511956132:web:28ee37356d5a14d6"
};

firebase.initializeApp(config);

export default firebase;