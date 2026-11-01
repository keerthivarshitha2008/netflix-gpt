import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPiacKERB4wFWWcmqAP4pYGmchsPau4gU",
  authDomain: "netflixgpt-89160.firebaseapp.com",
  projectId: "netflixgpt-89160",
  storageBucket: "netflixgpt-89160.firebasestorage.app",
  messagingSenderId: "841290385898",
  appId: "1:841290385898:web:474f153ba2364ebf318a93",
  measurementId: "G-SEQY61TP7K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);
