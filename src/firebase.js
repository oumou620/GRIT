// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Ajouter cette ligne

const firebaseConfig = {
  apiKey: "AIzaSyCAQusPHgsWLp1Vtq9wm6nKYgoHPwY4Ilk",
  authDomain: "gr-it-ec940.firebaseapp.com",
  projectId: "gr-it-ec940",
  storageBucket: "gr-it-ec940.firebasestorage.app",
  messagingSenderId: "577048367479",
  appId: "1:577048367479:web:c153ff0ae62da780a59172",
  measurementId: "G-RTFYD571BT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialiser Firestore
const db = getFirestore(app);

// ✅ Exporter db pour l'utiliser ailleurs
export { db };
