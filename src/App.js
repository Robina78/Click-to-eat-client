import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import UserApi from './api/api';
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import LoadingSpinner from "./common/LoadingSpinner";
import UserContext from './auth/UserContext';
import Navigation from './routes-nav/Navigation';
import PageRoutes from './routes-nav/PageRoutes';
export const TOKEN_STORAGE_ID = "user-token";




export default function App() {
  const [infoLoaded, setInfoLoaded] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  
  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);          
          UserApi.token = token;
          let currentUser = await UserApi.getCurrentUser(username);
          setCurrentUser(currentUser);         
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    /** set infoLoaded to false while async getCurrentUser runs; once the
     * data is fetched (or even if an error happens!), this will be set back
     * to false to control the spinner.
     */
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handle site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handle site-wide signup.
   * 
   * automatically logs them in (set token) upon signup.
   * 
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await UserApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup faild", errors);
      return { success: false, errors };
    }
  }

  /** Handle site-wide login.
   * 
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await UserApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors};
    }
  }

    if(!infoLoaded) return <LoadingSpinner />


  return (
    <BrowserRouter>
      <UserContext.Provider 
          value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />         
          <PageRoutes login={login} signup={signup}/>          
        </div> 
      </UserContext.Provider>
    </BrowserRouter>
  );
}


