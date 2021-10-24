import React from "react";
import {Link} from "react-router-dom"
import { useAuth } from "../context/auth";

export default function Home() {

    const { isLoggedIn } = useAuth();


    if(!isLoggedIn)
        return <>
            <h1>You Need To Login First To Create new Task</h1>
            <Link to="/login"> Login </Link>
        </>



  return (
    <React.Fragment>
      <h1>Logged In Successfully</h1>
          <Link to="/task"> Create Your Task Here </Link>
    </React.Fragment>
  );
}
