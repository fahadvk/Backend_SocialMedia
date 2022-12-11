import admin from 'firebase-admin'
// import  '../serviceAccountkey.json'
import {config} from 'dotenv'
config()
import firebase from 'firebase/app';
import { serviceAccount } from './Service'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.DATABASEURL
  
});


const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.API_ID,
    measurementId: process.env.MEASUREMENT_ID
};
// firebase.initializeApp(firebaseConfig);


export const adminAuth = admin.auth()