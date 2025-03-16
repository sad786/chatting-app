import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {

    apiKey: "AIzaSyBlIimHBP59wtzUdwvJ-rmiLgiTz5v-fQ8",
  
    authDomain: "chat-app-cce00.firebaseapp.com",
  
    projectId: "chat-app-cce00",
  
    storageBucket: "chat-app-cce00.firebasestorage.app",
  
    messagingSenderId: "128937400594",
  
    appId: "1:128937400594:web:b49cc0accf0f2c33323bcb",
  
    measurementId: "G-MW73CH6CV7"
  
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request permission and get FCM token to receive notifications
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log(permission)
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BCsg4LfnLP_kF_M1EpdJ_Kua1W0MXUnX2WxIR65kFoLO3F80rP6aVl6HKExYwqrHxfxssHLGyXbFXjVWFtn1-N0",
        
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
