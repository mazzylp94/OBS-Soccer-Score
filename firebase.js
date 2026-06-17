import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {

apiKey: "TU_API_KEY",

authDomain:
"marcador-futbol-e1259.firebaseapp.com",

databaseURL:
"https://marcador-futbol-e1259-default-rtdb.firebaseio.com/",

projectId:
"marcador-futbol-e1259",

storageBucket:
"marcador-futbol-e1259.firebasestorage.app",

messagingSenderId:
"58974836448",

appId:
"1:58974836448:web:63033110c30e9751436285"

};

const app =
initializeApp(firebaseConfig);

export const db =
getDatabase(app);

export {
ref,
set,
onValue
};