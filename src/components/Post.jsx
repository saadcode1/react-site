import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Post(){
    let [error,setError]=React.useState("");
    const navigate = useNavigate();
    let [input,setInput]=React.useState({
        description:"",
        image:"",
    });
    function handleEvent(e){
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
        console.log(input);
    }

   async function handleForm(e){
    try{ e.preventDefault();
      let response= await axios.post("http://localhost:8888/post",input);
      console.log(response,"form frontend");
      if (response.status === 201) {
      return navigate("/");
      }
    }catch(err){
         if(err.response.status === 500){
          setError(err.response.data.message);
         }
      }
       
    }
    return(<div>
      {error &&(<div>{error}</div>)}
        <form onSubmit={handleForm}>
       
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth name="description" label="Description" onChange={handleEvent} id="fullWidth" />
      &nbsp;&nbsp;
      <TextField fullWidth name="image" label="Image Url" onChange={handleEvent} id="fullWidth" />
      <Button type="submit" variant="contained">Post</Button>
    </Box>
    </form>
    </div>
    )
}
