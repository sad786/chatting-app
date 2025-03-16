import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, LinearProgress} from '@mui/material';
import { makeStyles} from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import handleAuth from '../auth/Auth.js';
//import SimpleSnackbar from './SimpleSnackbar';
//import Register from './Register';
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
            justifyContent: 'space-between',
            marginTop: 20,
        },
        button: {
            marginRight:5,
        },
    });
});

const Login = ({onClick, setUser}) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    
    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in all fields.');
        }else{
            try{
                    const data = await handleAuth('login',{username,password});
                    //console.log('Login Success');
                    localStorage.setItem('user-info',JSON.stringify(data.user));
                    onClick(false);
                    setUser(data.user);
                
            }catch(error){
                
                setError(error.message);
            }
        }
    };

    const handleSignup = async () => {
        onClick(false);
        setUser(null);
    };

    return (
        <Container className={classes.root}>
            {loading && <LinearProgress style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} />}
            <div className={classes.form}>
                <Typography className={classes.formContainer} variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
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
                <Container className={classes.buttonContainer}>
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
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={async () => {
                            setLoading(true);
                            await handleLogin();
                            setLoading(false);
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        sx={{ marginLeft: 10 }}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={async () => {
                            setLoading(true);
                            // Add your signup logic here
                            await handleSignup();
                            setLoading(false);
                        }}
                    >
                        Signup
                    </Button>
                </Container>
            </div>
        </Container>
    );
};

export default Login;