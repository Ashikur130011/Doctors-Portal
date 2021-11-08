import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Hook/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const{token} = useAuth();
    const handleOnBlur = (e) => {
      setEmail(e.target.value);
    };
    const handleAdminSubmit = e => {
        const user ={email}
        fetch("http://localhost:5000/users/admin", {
          method: "PUT",
          headers: {
              'authorization': `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .the((res) => res.json())
          .then((data) => {
              if(data.modifiedCount){
                  console.log(data);
                  setSuccess(true);
              }
          });
        
        e.preventDefault();
    }
    
    return (
      <div>
        <h1>Make a admin</h1>
        <form onSubmit={handleAdminSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            onBlur={handleOnBlur}
          />

          <Button type="submit" variant="contained" color="success">
            Success
          </Button>
        </form>
        {success && (
          <Alert severity="success">
            Admin created successfully — check it out!
          </Alert>
        )}
      </div>
    );
};

export default MakeAdmin;