import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCy_h379Bkq27iyZVk4cjSvWd_oUCpEoK0",
    authDomain: "projeto-cfba8.firebaseapp.com",
    projectId: "projeto-cfba8",
    storageBucket: "projeto-cfba8.appspot.com",
    messagingSenderId: "84202575924",
    appId: "1:84202575924:web:24def9e15ded7f11b59261",
    measurementId: "G-Y2QBDP11YW"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export { db };