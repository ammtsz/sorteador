import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBtC33N0ifehu3Afh0b3AZBxAn8JfcxQXI",
  authDomain: "drawer-64ee3.firebaseapp.com",
  databaseURL: "https://drawer-64ee3.firebaseio.com",
  projectId: "drawer-64ee3",
  storageBucket: "drawer-64ee3.appspot.com",
  messagingSenderId: "474754218033",
  appId: "1:474754218033:web:6589325b3aebaf9a2dfd10",
  measurementId: "G-S2F2L28V8M",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
