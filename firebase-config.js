// firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyDV_suRKZfNkHR5OJABEvDvf-CXSNfbG88",
    authDomain: "confession-4d848.firebaseapp.com",
    
    // 👇 THIS IS THE MISSING LINE! 👇
    databaseURL: "https://confession-4d848-default-rtdb.firebaseio.com", 
    
    projectId: "confession-4d848",
    storageBucket: "confession-4d848.firebasestorage.app",
    messagingSenderId: "839865796935",
    appId: "1:839865796935:web:e6911c8dddf6bd0e12a462"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize Database
const db = firebase.database();

// The "Magic" Saver (Copies local data to Cloud)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, [key, value]);
    db.ref('her_response').update({
        [key]: value,
        last_updated: Date.now()
    });
};