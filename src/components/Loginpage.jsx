import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';

export default function Loginpage() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [error, setError] = useState('');
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleEvent = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:8888/login', input);
      if (response.status === 201) {
        login(response.data);
        navigate('/');
      }
    } catch (e) {
      setError(e.response.data);
    }
  };

  return (
    <div>
    {error && (<div>{error}</div>)}
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleForm}
      > 
        <TextField id="outlined-basic" name="username" label="UserName" onChange={handleEvent} variant="outlined" />
        <TextField id="outlined-basic" name="password" label="Password" onChange={handleEvent} variant="outlined" />
        <Button type="submit" variant="contained">SignIn</Button>
       
      </Box>
   </div>
  );
}