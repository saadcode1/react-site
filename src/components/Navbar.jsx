import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { UserContext } from './userContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Navbar(){
  const { currentUser,logout } = useContext(UserContext);

  async function loggingOut(){
      let response= await axios.get("http://localhost:8888/logout");
      console.log(response,"after logging out");
      if(response.status === 201){
        logout();
        console.log("successfully loggedOut");
      }
  }
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" color="inherit">Home</Link>
            &nbsp;&nbsp;
            <Link to="/post" color="inherit">Create Posts</Link>
            </Typography>
            {currentUser?null:<Link to="/login" color="inherit">LogIn</Link>}
            &nbsp;&nbsp;
            {currentUser?<Button onClick={ loggingOut} color="inherit">Logout</Button>:<Link to="/signin" color="inherit">signin</Link>}
          </Toolbar>
        </AppBar>
      </Box>
    )
}
