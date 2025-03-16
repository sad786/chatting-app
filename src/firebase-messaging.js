import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,

  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request permission and get FCM token to receive notifications
export const requestNotificationPermission = async () => {
  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("Service Worker Registered");
    const permission = await Notification.requestPermission();
    console.log(permission)
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID,
        serviceWorkerRegistration: registration,
      });
      console.log(token);
      return token;
    }else{
      console.log('Permission denied');
      return null;
    }
  } catch (error) {
    console.error("FCM Token Error:", error);
  }
};

// Handle incoming messages when app is open
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  alert(`New message: ${payload.notification.body}`);
});
