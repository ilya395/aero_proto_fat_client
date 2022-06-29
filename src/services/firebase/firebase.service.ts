import * as firebase from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_DATABASE_URL,
  projectId: process.env.REACT_PROJECT_ID,
  storageBucket: process.env.REACT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

class Firebase {
  auth: any;

  database: any;

  userUid: null | string | number;

  app: firebase.FirebaseApp;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);

    this.auth = getAuth();
    this.database = getDatabase();
    this.userUid = null;
  }

  setUserUid = (uid: string | number) => {
    this.userUid = uid;
  }

  signWithEmail = (email: string, password: string) => signInWithEmailAndPassword(this.auth, email, password);
}

export default Firebase;