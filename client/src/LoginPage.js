import { navigate } from "@reach/router";
import AuthService from "./AuthService";
import Login from "./Login";
import React, {useEffect,useState} from 'react';
const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function LoginPage() {

    //login function, setCount to 
    async function login(username, password) {
        try {
          const response = await authService.login(username, password);
          console.log("Authentication:", response.msg);
          navigate("/")

        } catch (error) {
          console.log("Login", error);
        }
      }

      //if logged in, show by text
      let loginContent =<p>You are already logged in</p>

      //if not logged in, show the login
      if (!authService.loggedIn()) {
        loginContent = <Login login={login} />;
      } 
      
    return (
        <>
        {loginContent}
        </>
      );
    }
    export default LoginPage;
    