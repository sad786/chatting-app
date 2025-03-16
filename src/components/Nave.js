import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
//import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

//import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    loginButton: {
        position: 'absolute',
        left: '16px',
    },
}));




const Navbar = ({ setLogin, typing }) => {

    //const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    //handleLogout();
  };

  const handleLogout = () => {
    
    localStorage.removeItem("jwtToken");
    localStorage.removeItem('user-info');
    setLogin(true);
  };
    const classes = useStyles();
    //console.log(typing);
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem key={0} onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
                    {/*<Button color="inherit" className={classes.loginButton} onClick={handleLogout}>Logout</Button>*/}
                    <Typography variant="h6" className={classes.title} color="#fff">
                        {typing?'typing....':''}
                    </Typography>
                    {/*<Typography variant="h6" color="red" alignItems="center">{isTyping?'user is typing':''}</Typography>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;