import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDhVaCwba8NaC_aJELecZ1g14FW2Q6saR8",
    authDomain: "crwn-db-8c562.firebaseapp.com",
    projectId: "crwn-db-8c562",
    storageBucket: "crwn-db-8c562.appspot.com",
    messagingSenderId: "501434789817",
    appId: "1:501434789817:web:b2c2132d6ec974c0009068",
    measurementId: "G-WHRWG6QS3H"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user: ', error.message );
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;