import {Box, Paper, Typography, Avatar} from "@mui/material";
import { Check, CheckCircle, Visibility } from "@mui/icons-material";
import {useRef, useEffect} from 'react';

const Messages = ({messages, user}) => {
    const chatEndRef = useRef(null);
    useEffect(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages]);
    return (
        <div>
        {messages.map((msg, ind) => (
          <Box
            key={ind}
            sx={{
              display: "flex",
              justifyContent: msg.sender === user.username ? "flex-end" : "flex-start",
              marginBottom: 2,
            }}
          >
            {msg.sender !== user.username && (
              <Avatar sx={{ marginRight: 2 }} alt={msg.sender} src={`/path-to-avatar/${msg.sender}.jpg`} />
            )}

            <Paper
              sx={{
                padding: 2,
                backgroundColor: msg.sender === user.username ? "#5D97E9" : "#825DE9",
                color: msg.sender === user ? "#fff" : "#fff",
                maxWidth: "70%",
                borderRadius: 2,
                boxShadow: 2,
                textAlign: msg.sender === user.username ? "right" : "left",
                animation: "slideIn 0.3s ease-in-out",
              }}
            >
              <Typography variant="body1">{msg.message}</Typography>{
                msg.sender === user.username && (
              <Typography variant="caption" sx={{ marginTop: 0.5 }}>
                {msg.status === "sent" ? (
                  <Check sx={{ fontSize: 14, color: "white" }} />
                ) : msg.status === "delivered" ? (
                  <CheckCircle sx={{ fontSize: 14, color: "#FE9900" }} />
                ) : (
                  <Visibility sx={{ fontSize: 14, color: "blue" }} />
                )}
              </Typography>)}
            </Paper>

            {msg.sender === user.username && (
              <Avatar sx={{ marginLeft: 2 }} alt={msg.sender} src={`/path-to-avatar/${msg.sender}.jpg`} />
            )}
            <div ref={chatEndRef} />
          </Box>
        ))}
    </div>
    );
}

export default Messages;