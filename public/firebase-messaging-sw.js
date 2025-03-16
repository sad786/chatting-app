/* eslint-disable no-restricted-globals, no-undef */
// importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// // import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

// import {initializeApp} from "firebase/app";
// import { getMessaging, onBackgroundMessage} from "firebase/messaging/sw";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

const messaging = firebase.messaging();



// const message = getMessaging(app);
messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ",payload);


    const title = payload.notification.title;
    const options = {
        body: "Background Message body",
        icon: "/logo192.png",
    };

    // self.registration.showNotification(payload.notification.title, {
    //     body: payload.notification.body,
    //     icon: payload.notification.icon
    // });

    // self.regsistration.showNotification(title,options);

    self.registration.showNotification(title,options);
});
