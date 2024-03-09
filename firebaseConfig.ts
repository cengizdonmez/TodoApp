import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBbUpeKCSmyQRak74QxORHogNwSM2YlzWg",
    authDomain: "todo-app-jses.firebaseapp.com",
    projectId: "todo-app-jses",
    storageBucket: "todo-app-jses.appspot.com",
    messagingSenderId: "1089970669441",
    appId: "1:1089970669441:web:60c3e43fd49d9e35e2ca80"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH, (user) => {
//     if (user) {
//         console.log('Kullanıcı giriş yaptı');
//     } else {
//         console.log('Kullanıcı çıkış yaptı');
//     }
// });