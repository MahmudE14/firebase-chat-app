import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBle-3EBCYooYf1KxnITzwuvk8S44Obhe0",
  authDomain: "fir-chat-app-e4580.firebaseapp.com",
  projectId: "fir-chat-app-e4580",
  storageBucket: "fir-chat-app-e4580.appspot.com",
  messagingSenderId: "581036164730",
  appId: "1:581036164730:web:65d9fff751228c48b85dc3"
};

/**
 * public facing app ID:
 * project-581036164730
 */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db }
