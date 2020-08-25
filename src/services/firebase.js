import firebase from "firebase";
import "firebase/firestore";

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
    this.database = firebase.firestore();
  }

  initializeApp() {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getDocument(collection, document) {
      let snapshot;
    try {
      snapshot = await this.database.collection(collection).doc(document).get();

      if (snapshot.exists) {
        return Promise.resolve(snapshot.data());
      }

      return Promise.resolve(null);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getCollection(collection, { field, sign, value } = {}, page = 1000) {
    let snapshot;
    try {
      if (field && sign && value) {
        snapshot = await this.database
          .collection(collection)
          .where(field, sign, value)
          .limit(page)
          .get();
      } else {
        snapshot = await this.database.collection(collection).limit(page).get();
      }

      const result = [];
      snapshot.forEach((doc) => {
        result.push({ ...doc.data(), key: doc.id });
      });

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default new FirebaseService();
