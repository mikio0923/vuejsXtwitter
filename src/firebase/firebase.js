import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhGw2BSYLuxnRgh8dVaEm57gq0z_teBmI",
    authDomain: "vue-chat-cb59d.firebaseapp.com",
    projectId: "vue-chat-cb59d",
    storageBucket: "vue-chat-cb59d.appspot.com",
    messagingSenderId: "80017539274",
    appId: "1:80017539274:web:38efa24858c4c809417433"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;