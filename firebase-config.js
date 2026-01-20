// firebase-config.js

// --------------------------------------------------------------
// 1. PASTE YOUR FIREBASE CONFIG HERE (Get this from Firebase Console)
// --------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSy...",  // <--- You will replace these lines
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456"
};
// --------------------------------------------------------------

// 2. Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// 3. The "Magic" Sync Function
// This listens for any time the website tries to save data to the phone, 
// and sends a copy to your Admin Dashboard automatically.
const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  // Save to phone (normal behavior)
  originalSetItem.apply(this, [key, value]);

  // Send copy to Cloud (Firebase)
  // We use a fixed document ID 'her_response' so all data stays in one place
  db.collection("confession_data").doc("her_response").set({
    [key]: value,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }); 
};

console.log("Firebase Connected and Listening...");