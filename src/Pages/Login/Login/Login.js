import { Alert, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import login from '../../../images/login.png'
import Button from "@mui/material/Button";
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hook/useAuth';

const Login = () => {
    const[loginData, setLoginData] = useState({})
    const { logInUser, isLoading, user, authError, signInUsingGoogle } =
      useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange= e => {
    const field = e.target.name;
    const value = e.target.value;
    //console.log(field, value);
    const newLoginData = {...loginData};
    newLoginData[field] = value;
    setLoginData(newLoginData)
    console.log(newLoginData);
}

    const handleLoginForm= e => {
        e.preventDefault()
        alert('nnnnn')
        logInUser(loginData.email, loginData.password, history, location);
    }

    const handleGoogleSignIn = () =>{
      signInUsingGoogle(history, location)
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 8 }} variant="h6" gutterBottom component="div">
            Login
          </Typography>
          {!isLoading && (
            <form onSubmit={handleLoginForm}>
              <TextField
                sx={{ width: "75%", m: 1 }}
                id="standard-basic"
                name="email"
                type="email"
                onBlur={handleOnChange}
                label="Your Email"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                type="password"
                name="password"
                onBlur={handleOnChange}
                id="standard-basic"
                label="Your Password"
                variant="standard"
              />
              <Button
                type="submit"
                sx={{ width: "75%", m: 1 }}
                variant="contained"
              >
                Login
              </Button>
              <NavLink style={{ textDecoration: "none" }} to="/register">
                <Button variant="text">New User? Register Here</Button>
              </NavLink>
              {isLoading && <CircularProgress />}
              {user?.email && (
                <Alert severity="success">
                  User created successfully — check it out!
                </Alert>
              )}
              {authError && <Alert severity="error">{authError}</Alert>}
            </form>
          )}
          <p>---------------------</p>
          <Button onClick={handleGoogleSignIn} variant="contained">Google Sign In</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: "90%" }} src={login} alt="" />
        </Grid>
      </Grid>
    );
};

export default Login;