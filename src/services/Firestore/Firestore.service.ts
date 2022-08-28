import { Firestore } from "firebase/firestore";

class FirestoreService {
  db: Firestore;

  constructor(firestore: Firestore) {
    this.db = firestore;
  }
}

export default FirestoreService;