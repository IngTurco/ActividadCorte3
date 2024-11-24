import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ATzSyB8yBttnQwO59EJ8Hu0uFRUABb2trq7rq",
  authDomain: "actividad-1-bbac0.firebaseapp.com",
  projectId: "actividad-1-bbac0",
  storageBucket: "actividad-1-bbac0.appspot.com",
  messagingSenderId: "1006951617813",
  appId: "1:1006951617813:web:4bd0d3f7e232c90280351c",
  measurementId: "G-9C3JDSDCZV",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
