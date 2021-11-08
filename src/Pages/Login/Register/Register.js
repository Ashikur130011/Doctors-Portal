import { Alert, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import login from "../../../images/login.png";
import Button from "@mui/material/Button";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const {registerUser, isLoading, user, authError} = useAuth();
  const  history = useHistory()

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    //console.log(field, value);
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
    console.log(newLoginData);
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    if(loginData.password !== loginData.password2){
    alert("Your password didn't match");
    return;
    }
    registerUser(loginData.email, loginData.password, loginData.name, history);
    
   
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 8 }} variant="h6" gutterBottom component="div">
            Register
          </Typography>
          {!isLoading && (
            <form onSubmit={handleLoginForm}>
              <TextField
                sx={{ width: "75%", m: 1 }}
                id="standard-basic"
                name="name"
                onBlur={handleOnBlur}
                label="Your Name"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                id="standard-basic"
                name="email"
                type="email"
                onBlur={handleOnBlur}
                label="Your Email"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                type="password"
                name="password"
                onBlur={handleOnBlur}
                id="standard-basic"
                label="Your Password"
                variant="standard"
              />
              <TextField
                sx={{ width: "75%", m: 1 }}
                type="password"
                name="password2"
                onBlur={handleOnBlur}
                id="standard-basic"
                label="Retype Your Password"
                variant="standard"
              />
              <Button
                type="submit"
                sx={{ width: "75%", m: 1 }}
                variant="contained"
              >
                Register
              </Button>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button variant="text">Already Registered? Login Here</Button>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: "90%" }} src={login} alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
