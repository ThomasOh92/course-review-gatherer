import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore, connectFirestoreEmulator, collection, addDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBuESgfI04UnphP04OkeNUkl8mkJilzaNY",
  authDomain: "course-review-gatherer.firebaseapp.com",
  projectId: "course-review-gatherer",
  storageBucket: "course-review-gatherer.appspot.com",
  messagingSenderId: "224454141100",
  appId: "1:224454141100:web:526ac76014d9d5c3602b09",
  measurementId: "G-XKVSBETHR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Settings for Firestore
initializeFirestore(app, {
  ignoreUndefinedProperties: true
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Connect to Firestore Emulator in development environment only
// if (location.hostname === '127.0.0.1') {
//     // Assuming your Firestore emulator is running on the default port
//     connectFirestoreEmulator(db, '127.0.0.1', 8080);
//   }

addDoc(collection(db, "users"), {
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});

export { db };
