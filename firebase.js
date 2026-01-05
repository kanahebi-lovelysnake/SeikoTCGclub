import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyC8cm52fZvu2tgmto30m3lM2H0Q7BO4BUs",
    authDomain: "seiko-tcgclub.firebaseapp.com",
    projectId: "seiko-tcgclub",
    storageBucket: "seiko-tcgclub.firebasestorage.app",
    messagingSenderId: "26473397326",
    appId: "1:26473397326:web:3c1b1f59afdfc5a611d71f"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)