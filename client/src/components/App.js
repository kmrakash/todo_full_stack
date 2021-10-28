import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/auth";

// import Admin from "./Admin";
import Header from "./Header"
import Home from "./Home";
// import Login from "./Login";
import Auth from "./Auth";
// import Register from "./Register";
import Task from "./Task";

import "../styles/App.css";

export default function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const existingUser = JSON.parse(localStorage.getItem("username"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
    const [isLoggedIn, setLoggedIn] = useState(existingTokens !== null);
    const [username, setUsername] = useState(existingUser);

    const setUser = (user) => {
        localStorage.setItem("username", JSON.stringify(user));
        setUsername(user);
    }

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const logout = (e) => {
    e.preventDefault();
    setAuthTokens();
    setLoggedIn(false);
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider
        value={{ authTokens,
                setAuthTokens: setTokens ,
                isLoggedIn, setLoggedIn,
                username ,
                setUsername : setUser
                }}>
        <div className="w-full h-full font-mono">

      <Router>
          <Header logout={logout} authTokens={authTokens}  />

        <Route path="/login">
         <Auth mode ="login" />
        </Route>
        <Route path="/signup">
        <Auth mode="register" />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
            <PrivateRoute exact path="/task">
                <Task />
            </PrivateRoute>
              {/* <Route exact path="/task">
                  <Task />
              </Route> */}
      </Router>
          </div>
    </AuthContext.Provider>
  );
}
