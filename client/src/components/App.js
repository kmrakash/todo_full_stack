import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/auth";

// import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Task from "./Task";

import "../styles/App.css";

export default function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
    const [isLoggedIn, setLoggedIn] = useState(existingTokens !== null);

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
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens , isLoggedIn, setLoggedIn }}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>

            {!authTokens ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
            <PrivateRoute exact path="/task">
                <Task />
            </PrivateRoute>
      </Router>
    </AuthContext.Provider>
  );
}
