import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore, connectFirestoreEmulator, collection, addDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

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

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

// Function to track page views
function trackPageView(pageName: string) {
  logEvent(analytics, 'page_view', { page_title: pageName });
}

// Example usage: Track homepage visit
if (window.location.pathname === '/') {
  trackPageView('homepage');
}

// Example usage: Track FastAI page visit
if (window.location.pathname === '/fastai') {
  trackPageView('fastai_page');
}

// Settings for Firestore
initializeFirestore(app, {
  ignoreUndefinedProperties: true
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Connect to Firestore Emulator in development environment only
if (location.hostname === '127.0.0.1') {
    // Assuming your Firestore emulator is running on the default port
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }

export { db };
