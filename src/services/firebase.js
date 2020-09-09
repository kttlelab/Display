import { apps, firestore, initializeApp } from "firebase";

const config = {
  apiKey: "AIzaSyDDDlQuhV1umenGHFK34ZoG4Ob7s3c3oW0",
  authDomain: "ride-my-way-production.firebaseapp.com",
  databaseURL: "https://ride-my-way-production.firebaseio.com",
  projectId: "ride-my-way-production",
  storageBucket: "ride-my-way-production.appspot.com",
  messagingSenderId: "403153167805",
  appId: "1:403153167805:web:16f3a010be3e6a58509ed4",
  measurementId: "G-0T0VPJ35ZF",
};

class FirebaseService {
  constructor() {
    this.initializeApp();
    this.database = firestore();
  }

  initializeApp() {
    if (!apps.length) initializeApp(config);
  }

  async getDocument(collection, document) {
    let snapshot;
    try {
      snapshot = await this.database.collection(collection).doc(document).get();
      if (snapshot.exists) return Promise.resolve(snapshot.data());
      return Promise.resolve(null);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getCollection(collection, { value = "" } = {}) {
    try {
      const snapshot = await this.database.collection(collection).get();
      const result = [];
      snapshot.forEach((doc) => {
        result.push({ ...doc.data(), key: doc.id });
      });
      return result.filter((r) => r.route && r.route.includes(value));
    } catch (e) {
      return e;
    }
  }
}

export default new FirebaseService();
