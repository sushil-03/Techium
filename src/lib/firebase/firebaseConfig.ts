// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCTnV60G0AxC9wRR6sBK-gUAXBjdCGbvdo",
  authDomain: "ownerpreneur-98a6d.firebaseapp.com",
  projectId: "ownerpreneur-98a6d",
  storageBucket: "ownerpreneur-98a6d.appspot.com",
  messagingSenderId: "1018537508872",
  appId: "1:1018537508872:web:e8f0962a685837135391bd",
  measurementId: "G-8715SSP0TC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, provider };
export default app;
