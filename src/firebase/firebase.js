import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC3vnf9lBI6h00jzh-9zP5sPHa9Z28KIPM',
    authDomain: 'tiktok-26cbe.firebaseapp.com',
    projectId: 'tiktok-26cbe',
    storageBucket: 'tiktok-26cbe.appspot.com',
    messagingSenderId: '967924606444',
    appId: '1:967924606444:web:f3a3bd2dddaf91b11a0cc9',
    measurementId: 'G-548J7SN3DR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
