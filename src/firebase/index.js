import FirebaseContext, { withFirebase } from "./context";
import firebase, {
  doSignInWithGoogle,
  doSignOut,
  db,
  firebaseConfig,
  storageRef,
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "./firebase";

export default firebase;

export {
  FirebaseContext,
  db,
  withFirebase,
  doSignInWithGoogle,
  doSignOut,
  firebaseConfig,
  storageRef,
  doSignInWithEmailAndPassword,
  doPasswordReset,
};
