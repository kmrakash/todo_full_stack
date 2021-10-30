import React, {  useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { login } from "../helpers/api";
import { register } from "../helpers/api";
import Message from "./Message";
import Button from "./Button";
import Input from "./Input";

export default function Auth({ mode }) {
    const history = useHistory();
    const { setAuthTokens, isLoggedIn, setLoggedIn , setUsername : setUser } = useAuth();
//   const [] = ;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const referer = history?.location?.state?.referer || "/";


  const postLogin = (e) => {
    e.preventDefault();
    login({ username, password })
      .then((response) => {
         // console.log("Login Response:", response);
        if (response.accessToken) {
          setAuthTokens(response.accessToken);
          setUser(response.username);
          setLoggedIn(true);

        } else {
        //   console.error(response.reason);
          setErrMsg(response.reason);
        }
      })
      .catch((error) => {
          setErrMsg(error);
        console.log(error);
      });
  };

    const postRegistration = (e) => {
        e.preventDefault();
        register({ username, password }).then((response) => {
            if (response.status === 200) {
                console.log(response.message);
                // setErrMsg("Signed up successfully");
                history.push("/login")
            } else if (response.status >= 400) {
                setErrMsg(response.message);
                // console.error(response.message);
            }
        });
    };

  if (isLoggedIn) return <Redirect to={referer} />;

  return (
    <div className="container w-auto h-auto">
          <div className={`
            border rounded-lg
            bg-blue-200
            py-10
            flex
            flex-col
            items-center
        `}>


       { errMsg && <Message>
            {errMsg}
        </Message>}


      <form onSubmit={ mode === 'login' ? postLogin : postRegistration }>
        <div className="mb-4">
                  <label htmlFor="username">Username: </label>
                  <Input
                      name="username"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
        </div>

        <div className="">
                  <label htmlFor="password">Password: </label>
                  <Input
                      name="password"
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
        </div>

        <Button
        type="submit"
        className="w-full bg-blue-400 hover:bg-blue-700"
        >
            {
                mode === 'login' ?
                `Sign In` :
                `Sign Up`
            }

        </Button>
      </form>

      {
          mode === 'login' ?
                      <Link
                          className="text-red-700"
                          to="/signup">
                              Don't have an account?
                              </Link>
                      : <Link to="/login">Already have an account?</Link>
      }

    </div>
      </div>
  );
}
