import {initializeApp} from 'firebase/app';
import 'firebase/database';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAiARl-FXANAm89c_ptt3ss2vhue9Do78o",
    authDomain: "video-call-77eb8.firebaseapp.com",
    projectId: "video-call-77eb8",
    storageBucket: "video-call-77eb8.appspot.com",
    messagingSenderId: "894239961219",
    appId: "1:894239961219:web:4677b6198c016f00342bb6",
    measurementId: "G-D3HY9ZKWQ5",
    databaseURL: "https://video-call-77eb8-default-rtdb.firebaseio.com/"
  };

const app=initializeApp(firebaseConfig);
export const database = getDatabase(app);
