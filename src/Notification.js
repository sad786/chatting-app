import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage} from "firebase/messaging";
//import { onBackgroundMessage } from "firebase/messaging/sw"; // Import for background notifications

const firebaseConfig = {

    apiKey: "AIzaSyBlIimHBP59wtzUdwvJ-rmiLgiTz5v-fQ8",
  
    authDomain: "chat-app-cce00.firebaseapp.com",
  
    projectId: "chat-app-cce00",
  
    storageBucket: "chat-app-cce00.firebasestorage.app",
  
    messagingSenderId: "128937400594",
  
    appId: "1:128937400594:web:b49cc0accf0f2c33323bcb",
  
    measurementId: "G-MW73CH6CV7"
  
};



function MessagingComponent() {
  const [fcmToken, setFcmToken] = useState(null);


  useEffect(() => {

  
    
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);


    

    // Request permission and get token
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

            const registerServiceWorker = async () => {
                if('serviceWorker' in navigator){
                    try{
                        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js',{
                            type:"module"
                        });
        
                        console.log('Service worker registered:', registration);
        
                    }catch(err){
                        console.error('Service Workder registration failed: ',err);
                    }
                }
            };
            
          // Get token
          const token = await getToken(messaging, {
            vapidKey: "BCsg4LfnLP_kF_M1EpdJ_Kua1W0MXUnX2WxIR65kFoLO3F80rP6aVl6HKExYwqrHxfxssHLGyXbFXjVWFtn1-N0",
            
          });
          const topic = "test-notifications";
          if (token) {
            console.log("FCM Registration Token:", token);
            setFcmToken(token);
            registerServiceWorker();
            // Subscribe to a topic (e.g., 'test-notifications' or 'all-users')
            
                const subsribeToTopic = async (token, topic) =>{
                    try {
                    //await subscribeToTopic(messaging, token, 'test-notifications');
                        const res = fetch(`https://iid.googleapis.com/iid/v1/${token}/re/topics/${topic}`,{
                                            method:"POST",
                                            headers: {
                                                Authorization: `Bearer key=${firebaseConfig.apiKey}`,
                                                "Content-Type":"application/json",
                                            },
                                          });
                                //console.log('FCM Response: ',(await res.json()));
                                if(res.ok){
                                    console.log(`Successfully subscribed to topic ${topic}`);
                                }else{
                                    console.error('Faild to subscribe to topic: ',topic,(await res).status,res.statusText);
                                }
                        //console.log('Successfully subscribed to topic: test-notifications');
                        } catch (error) {
                            console.error('Error subscribing to topic:', error);}
                    };
                
                await subsribeToTopic(token, topic);
          } else {
            console.log("No registration token available. Request permission to generate one.");
          }
        } else {
          console.log("Permission denied :(");
        }
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };

    requestNotificationPermission();

    // Handle incoming messages (foreground)
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Display notification (using browser's Notification API)
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.image || null,
      });
    });
  }, []); // Run only once on component mount


  return (
    <div>
      <p>FCM Token: {fcmToken || 'Not available'}</p>
      {/* Your other app content */}
    </div>
  );
}

export default MessagingComponent;