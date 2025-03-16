import React, { useState } from "react";
//import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SimpleSnackbar = ({sev, msg, onClick}) => {
    const [open, setOpen] = useState(true);
    
    // const handleClick = () =>{
    //     setOpen(true);
    // };

    const handleClose = (event, reason) =>{
        if (reason==="clickaway"){
            return;
        }
        setOpen(false);
        onClick();
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={sev} sx={{ width: "100%" }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );

};

export default SimpleSnackbar;