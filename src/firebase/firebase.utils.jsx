import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCsrOJlUQUCllA7PG3FrLM0BI0cPQvs37k",
  authDomain: "sorteador-3d351.firebaseapp.com",
  databaseURL: "https://sorteador-3d351.firebaseio.com",
  projectId: "sorteador-3d351",
  storageBucket: "sorteador-3d351.appspot.com",
  messagingSenderId: "918339936487",
  appId: "1:918339936487:web:02d2ac9f4fc4032ba94242",
  measurementId: "G-0X0WL2CTE3",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
