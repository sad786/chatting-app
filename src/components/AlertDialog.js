import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogAction from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";



const AlertDialog = () =>{

    const [open, setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Open Alert Dialog</Button>
            <Dialog open={open}
                onClose = {handleClose}
                aria-labelledby="alert-dailog-title"
                aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dailog-title">{"Alert Title"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This is an alert message. Do you want to proceed?
                        </DialogContentText>
                    </DialogContent>
                    <DialogAction>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} autoFocus>Confirm</Button>
                    </DialogAction>
                </Dialog>
        </div>
    );
};


export default AlertDialog;