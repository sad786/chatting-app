import axios from "axios";
import { requestNotificationPermission } from "../fire";

const saveFCMToken = async (userId) =>{
const fcmToken = await requestNotificationPermission();

      if (fcmToken) {
        //console.log('token is ',token);
        const tok = localStorage.getItem("token");
        //const userId = localStorage.getItem("userid");
        await axios.post(process.env.BACKEND_URL+"/auth/save-fcm-token",{userId, fcmToken}, {
          headers: {
            Authorization:`Bearer ${tok}`,
            "Content-Type":"application/json",
          },
        });
      }
};

export default saveFCMToken;