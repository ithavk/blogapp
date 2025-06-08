// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAK9-OLpUt_DjO8vePYFv27yErt4a1zc8",
  authDomain: "blog-app-91333.firebaseapp.com",
  projectId: "blog-app-91333",
  storageBucket: "blog-app-91333.appspot.com",
  messagingSenderId: "744977118439",
  appId: "1:744977118439:web:663cae24e163af5d451e42",
  measurementId: "G-CHC5M15DTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };