import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from './userContext';
import { useNavigate } from 'react-router-dom';

export default function Signin(){
  const { login } = useContext(UserContext);
    const navigate = useNavigate();
    let [error,setError]=React.useState("");
    let [input,setInput]=React.useState({
        username:"",
        email:"",
        password:"",
    });

    function handleEvent(e){
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    async function handleForm(e){
        try{
            e.preventDefault();
              let response = await axios.post("http://localhost:8888/signin", input);
            if(response.status === 201){
                login(response.data);
                navigate("/");
            }
           
        }catch(e){
            setError(e.response.data)
        }
      
         
       }
   return(<div>
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
        <TextField id="outlined-basic" name="email" label="Email" onChange={handleEvent} variant="outlined" />
        <TextField id="outlined-basic" name="password" label="Password" onChange={handleEvent} variant="outlined" />
        <Button type="submit" variant="contained">SignIn</Button>
       
      </Box>
   </div>)
}