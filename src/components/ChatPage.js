import React, { useState, useEffect, useRef} from 'react';
import { Box, List, ListItem,TextField, Typography, Avatar, ListItemButton, ListItemText, Button, Paper, IconButton, Dialog, Badge, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { makeStyles } from '@mui/styles';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Messages from './Messages';
import Navbar from './Nave.js';
import {requestNotificationPermission} from '../firebase-messaging.js';

import { io } from "socket.io-client";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '585px',
    },
    userList: {
        width: '25%',
        borderRight: '1px solid #ccc',
        overflowY: 'auto',
    },
    chatContainer: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
    },
    chatBox: {
        flexGrow: 1,
        padding: 16, // replace theme.spacing(2) with a fixed value
        overflowY: 'auto',
    },
    messageInput: {
        display: 'flex',
        padding: 8, // replace theme.spacing(1) with a fixed value
        borderTop: '1px solid #ccc',
    },
    messageField: {
        flexGrow: 1,
        marginRight: 8, // replace theme.spacing(1) with a fixed value
    },
});



const ChatPage = ({user, setLogin}) => {

    //console.log('before ->',user);
    //console.log('user is this ',user);
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    //const [unseenMessages, setUnseenMessages] = useState(0);
    const lastMessage = useRef(messages[messages.length-1]);
    const selectedUserRef = useRef(selectedUser);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_URL, {
            transports:['websocket'],
            auth: {
                token: localStorage.getItem('jwtToken'),
            },
        });
        
        //console.log('scoket is ',socket);
        setSocket(socket);

        socket.on('userConnected', async (userObj) => {

            //if((userObj.username !== user.username)){
               // console.log('user-info',user);
                userObj = Object.keys(userObj)

                const userList = userObj.map((user) => {return {username:user,rem:false,count:0}});
                setUsers(userList);
        });

        socket.on('userTyping', (isTyping, user) => {
            
            if(user===selectedUserRef.current){
                setIsTyping(() => isTyping);
            }
        });

        socket.on('receiveMessage', async (messageObj)=> {
            
            if(messageObj.sender === selectedUserRef.current){
                setMessages((prev) => [...prev, messageObj]);
            }else{
                
                //console.log(messageObj.sender, '<--->', selectedUserRef.current);
                setUsers((users) => users.map((user) => user.username===messageObj.sender?{...user, count:user.count+1,rem:true}:user));
            }
        });

        socket.on('messageId', async (messageId) => {            
            lastMessage.current['id'] = messageId;
            
        });

        socket.on('userDisconnected', async (userObj)=>{
           // console.log('React Disconnected..',userObj);
            //userObj = Object.keys(userObj)
            setUsers((prev) => prev.filter((user) => user.username===userObj));
        });

        // socket.on('connect', () => {
        //     console.log('React user connected....');
        // });

        // Listen for message status updates
        socket.on("messageDelivered", (messageId) => {
            //setMessages((prev) => prev.map((msg) => ({...msg, status:"delivered"})));

            setMessages((prev) => prev.map((msg) => {
                if(msg.id === messageId){
                    return {...msg, status:"delivered"};
                }
                return msg;
            }));
            //console.log('Message Delivered ',messageId);
            socket.emit('markAsSeen',messageId);
        });
    
        socket.on("messageSeen", (messageId) => {

            //setMessages((prev) => prev.map((msg) => ({...msg, status:"seen"})));
            setMessages((prev) => prev.map((msg) => {
                if(msg.id === messageId){
                    return {...msg, status:"seen"};
                }
                return msg;
            }));
        });
        
        return () => {
          socket.off("messageDelivered");
          socket.off("messageSeen");
          socket.off("typing");
          socket.disconnect();
        };
      }, [user]);


    // const handleReceiveMessage = (messageObj) => {
    //     if(messageObj.receiver === selectedUser){
    //         setMessages((prev) => [...prev, messageObj]);
    //     }
    // };


    useEffect(() => {
        if(selectedUser){
            //Fetch chat history from the server
            const getMessage = async () => {
                try{
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/messages/${user.username}/${selectedUser}`,
                    {headers:{'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`}});
                
                    if(res.status===200){
                        //console.log('Fetched Messages is ',res.data);
                        setMessages(res.data);
                    }
                }catch(err){
                    //console.log('Error while fetching old messgaes ',err);
                };
            }

            getMessage();
            //console.log('Selected user is ',selectedUser);}
        }
        

            let fcm_token  = localStorage.getItem('fcm-token');
            if(!fcm_token){

                const fcm = async () => {
                fcm_token = await requestNotificationPermission();
                    if(fcm_token){
                        //console.log('React FCM token ',fcm_token);
                        try{
                            const res = await axios.post(process.env.REACT_APP_BACKEND_URL+'/auth/save-fcm-token/',{userId:user.id, fcmToken:fcm_token},
                                                    {headers:{'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`}});
                            //console.log('Response ',res);
                            if(res.status===200){
                                localStorage.setItem('fcm-token',fcm_token);
                            }else{
                                //console.log('Error while saving token',);
                            }
                        }catch(err){
                            console.log('Error while fetching FCM ->',err)
                        }
                        }else{
                            //console.log('Error while fetching token');
                    }
                };
             fcm();
            }

    },[selectedUser,user]);

    const handleTyping = (isTyping) => {
        socket.emit("typing", selectedUser,isTyping);
      };
    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            const newMessage = { sender:user.username, receiver: selectedUser, message: currentMessage, status:'sent' };
            lastMessage.current = newMessage;
            setMessages((messages) => [...messages, newMessage]);
            socket.emit("sendMessage", newMessage);
            setCurrentMessage(""); // Clear input field
          }
    };

    const handleEmojiClick = (emojiObject) => {
        //console.log(emojiObject);
        setCurrentMessage(currentMessage + emojiObject.emoji);
        setEmojiPickerOpen(false);
    };

    const handleSelected =  (userObj) => {
        return () => {
            //console.log('Hello');
            setSelectedUser(userObj);
            selectedUserRef.current = userObj;
            setUsers((users) => users.map((user) => user.username===userObj?{...user, count:0,rem:false}:user));
        };
    }

    return (
        <>
        
        <Navbar setLogin={setLogin} typing={selectedUser && isTyping}/>
     
        <Box className={classes.root}>
            <Paper className={classes.userList}>
                <List>
                    <Typography variant="h6" fullwidth='true'>Online Users</Typography>
                    {users.map((user, index) => (
                        <ListItem key={index}  disablePadding>
                            <ListItemButton fullwidth='true'
                             selected={selectedUser===user.username}
                              onClick={handleSelected(user.username)}
                              sx={{
                                backgroundColor: selectedUser===user.username ? 'lightblue' : 'inherit',
                                '&.Mui-selected': {
                                    backgroundColor: 'lightblue',
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: 'lightblue',
                                },
                              }}>
                                <Avatar sx={{ marginRight: 2 }} alt={user.username} src={`/path-to-avatar/${user.username}.jpg`}/>
                                <ListItemText primary= {user.username} fullwidth='true'/>
                                {user.rem && <Badge badgeContent={user.count} color="primary">
                                    <ChatIcon color="action" />
                                </Badge>}
                              
                            {/*<Button variant="inherit" sx={{width:'100%' ,color:'red'}}>{user}</Button>*/}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            {selectedUser &&
            <Box className={classes.chatContainer}>
                <Box className={classes.chatBox}>
                    <Messages messages={messages} user={user}/>
                    
                </Box>
                <Box className={classes.messageInput}>
                    <IconButton onClick={() => setEmojiPickerOpen(true)}>
                        <EmojiEmotionsIcon />
                    </IconButton>
                    <Dialog open={emojiPickerOpen} onClose={() => setEmojiPickerOpen(false)}>
                        <DialogTitle>Pick an Emoji</DialogTitle>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </Dialog>
                    <TextField
                        className={classes.messageField}
                        variant="outlined"
                        placeholder="Type a message"
                        value={currentMessage}
                        onChange={(e) => {handleTyping(true);setCurrentMessage(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        onKeyUp={(e) => handleTyping(false)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: 8 }}>
                        Send
                    </Button>
                </Box>
            </Box>}
        </Box></>
    );
};

export default ChatPage;