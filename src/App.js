
import  Chat  from './components/ChatPage.js';
//import Auth from "./auth/Auth.js";
import {useState} from "react"
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import './App.css';

//import Push from './Notification.js';
// import { requestNotificationPermission, messaging } from './fire.js';
// import { onMessage } from "firebase/messaging"
// import {useEffect} from "react";
//import { createTheme, ThemeProvider } from "@mui/material/styles";


// const theme = createTheme({
//   palette:{
//     mode:"dark",
//   },
// });


function App() {
  // useEffect(() => {
  //   requestNotificationPermission();
  //   onMessage(messaging, (payload) => {
  //     alert(payload.notification.title, payload.notifiaiton.body);
  //     console.log(payload)
  //   });
  // },[]);

  const token = localStorage.getItem('jwtToken');
  let log = true;
  let userInfo = null;
  if(token){
    log = false;
    userInfo = JSON.parse(localStorage.getItem('user-info'));
  }

  const [user, setUser] = useState(userInfo);
  const [login, setLogin] = useState(log);

  //console.log('App.js user is ',user);
    
  return (
    <div>
      {login?(<Login onClick={setLogin} setUser={setUser}/>):(user===null?(<Register onClick={setLogin}/>):<Chat user={user} setLogin={setLogin}/>)}
    </div>
  );
}

export default App;
