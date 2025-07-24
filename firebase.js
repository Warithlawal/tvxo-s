// Import Firebase modules from CDN (v10 modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB9Q56dXE103V0hzxMzGsQRyttISFFJWxs",
  authDomain: "tvxo-9d001.firebaseapp.com",
  projectId: "tvxo-9d001",
  storageBucket: "tvxo-9d001.appspot.com",
  messagingSenderId: "808282246287",
  appId: "1:808282246287:web:03f68ba28287ce6120b4fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export db so it can be used in other modules
export { db };
