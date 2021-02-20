import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export var firebaseConfig = {
  apiKey: "AIzaSyDPB8nhQFAO0iWO8RomBEdqx0deSb9pp4M",
  authDomain: "atomic-c6046.firebaseapp.com",
  projectId: "atomic-c6046",
  storageBucket: "atomic-c6046.appspot.com",
  messagingSenderId: "475323317087",
  appId: "1:475323317087:web:f8440a01e8901b9b6694ea",
  measurementId: "G-CDJVPTFCTR",
};

const app = firebase.initializeApp(firebaseConfig);
export const storageRef = app.storage();

export const doSignInWithGoogle = () =>
  app.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const doSignInWithEmailAndPassword = (email, password) =>
  app.auth().signInWithEmailAndPassword(email, password);

export const doPasswordReset = (email) =>
  app.auth().sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) =>
  app.auth().currentUser.updatePassword(password);

export const doSignOut = () => app.auth().signOut();

export default app;

export const db = firebase.firestore();
