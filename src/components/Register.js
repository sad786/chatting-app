import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { makeStyles} from '@mui/styles';
import { useTheme } from '@mui/material/styles';
//import Login from './Login';
import SimpleSnackbar from './SimpleSnackbar';
import handleAuth from '../auth/Auth.js';

const useStyles = makeStyles(() => {
    const theme = useTheme();
    return ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
        },
        form: {
            width: '100%',
            maxWidth: 400,
            padding: 40,
            backgroundColor: '#fff',
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
        formContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom:5,
        },
        field: {
            marginBottom: 20,
        },
        buttonContainer: {
            display: 'flex',
            flexDirection:'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        button: {
            marginRight:5,
        },
    });
});

const Register = ({onClick}) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const classes = useStyles();
    

    const handleSignup = async () => {
        if (!username.trim() || !password.trim() || !email.trim() || !name.trim()) {
            setError('Please fill in all fields.');
        }else{

            try{

                await handleAuth('register', {username, password});
                // if(res.status===200){
                    console.log('Signup Success');
                    onClick(true);
                // }else{
                    //alert('some error occurred');
                    //throw new Error(res.message);
                // }
            }catch(err){
                //console.error(err);
                //throw new Error(err);
                setError(err.message);
            }
        }
    };

    return (
            <Container className={classes.root}>
                <div className={classes.form}>
                    <Typography className={classes.formContainer} variant="h5" component="h1" gutterBottom>
                        Signup
                    </Typography>
                    {error && <SimpleSnackbar sev="error" msg={error} onClick={() => setError('')} />}
                    <Container className={classes.formContainer}>
                        <TextField
                            className={classes.field}
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Container>
                    <Container className={classes.formContainer}>
                        <TextField
                            className={classes.field}
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Container>
                    <Container className={classes.formContainer}>
                        <TextField
                            className={classes.field}
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Container>
                    <Container className={classes.formContainer}>
                        <TextField
                            className={classes.field}
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Container>
                    <Container className={classes.buttonContainer}>
                        <Button
                            variant='contained'
                            color="primary"
                            fullWidth
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                        </Container>
                        <Container className={classes.buttonContainer}>
                            <Typography variant="h6" component="h6" gutterBottom>
                                Already have an account?
                            </Typography>
                            <Link
                                to="#"
                                onClick={() =>onClick(true)}
                                color="primary"
                                sx={{marginTop:0.5,cursor: 'pointer' }}
                            >
                                Login
                            </Link>
                        </Container>
                </div>
            </Container>
    );
};

export default Register;