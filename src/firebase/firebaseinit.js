import firebase from "firebase/compat/app"; // Thêm '/compat' vào đây
import "firebase/compat/firestore"; // Thêm '/compat' vào đây

const firebaseConfig = {
  apiKey: "AIzaSyCItILdq-p7GNNZy9ZGJHS-Gz-jURftabY",
  authDomain: "weatherapp-95207.firebaseapp.com",
  projectId: "weatherapp-95207",
  storageBucket: "weatherapp-95207.appspot.com",
  messagingSenderId: "489815554610",
  appId: "1:489815554610:web:72ec4a5841d5dbeb301a2b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
