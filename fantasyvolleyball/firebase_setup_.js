// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-check.js";

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"

import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {



};


// Initialize Firebase

const fire_app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(fire_app, {
  provider: new ReCaptchaV3Provider('6LfgoT8nAAAAACoykwmQxMLRTTPhBpBXOtYsKcdJ'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});


const db = getFirestore(fire_app);

const auth = getAuth();
auth.languageCode = 'en';


function handlePhoneNumberAuth(phoneNumber) {
  return new Promise((resolve, reject) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        resolve(confirmationResult)
      }).catch((error) => {
        // Couldn't send code.
        reject(error)
      });

  });
}

function handlePhoneNumberLog(confirmationResult, code) {
  return new Promise((resolve, reject) => {
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      resolve(result.user)
    }).catch((error) => {
      // User couldn't sign in (bad verification code?).
      reject(error)
    });
  });
}

function handleEmailAuth(email) {
  return new Promise((resolve, reject) => {
    sendSignInLinkToEmail(auth, email, {
      // this is the URL that we will redirect back to after clicking on the link in mailbox
      url: 'https://untimelyslushyregister.volleyvisual.repl.co#?test=true',
      handleCodeInApp: true,
    }).then(() => {
      resolve("true")
    }).catch((error) => {
      reject(error)
    });
  });
}

function handleEmailLog(email, link) {
  return new Promise((resolve, reject) => {
    signInWithEmailLink(auth, email, link)
      .then((result) => {
        resolve(result.user)
      }).catch((error) => {
        console.log(error)
        reject(error)
      });
  });
}

function actualUser() {
  return auth.currentUser
}

function newUser() {
  return auth.currentUser && auth.currentUser.displayName == null
}

function UpdateSubsribeStatus(val) {
  updateProfile(auth.currentUser, {
    displayName: val,
  }).then(() => {
    console.log("success")
  }).catch((error) => {
    console.log(e)
  });

}

function getAllPlayers() {
  return new Promise((resolve, reject) => {
    const usersCollection = collection(db, "players");
    getDocs(usersCollection)
      .then((querySnapshot) => {
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        })
        resolve(dataArray)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        reject(error)
      });
  });
}



window.handlePhoneNumberAuth = handlePhoneNumberAuth;
window.handlePhoneNumberLog = handlePhoneNumberLog;
window.handleEmailAuth = handleEmailAuth;
window.handleEmailLog = handleEmailLog;
window.actualUser = actualUser;
window.newUser = newUser;
window.UpdateSubsribeStatus = UpdateSubsribeStatus;
window.getAllPlayers = getAllPlayers;
