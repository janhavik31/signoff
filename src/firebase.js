
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkmNUr_m_A1miwmrAlmpXDhYdljra2M7Q",
  authDomain: "signoffpage.firebaseapp.com",
  projectId: "signoffpage",
  storageBucket: "signoffpage.firebasestorage.app",
  messagingSenderId: "240045860973",
  appId: "1:240045860973:web:e46aaf8eca6978f095b764"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
