import React from "react";
// import {Link} from "react-router-dom"
import { useAuth } from "../context/auth";
import Link from "./Link";


export default function Home() {

    const { isLoggedIn , username } = useAuth();


    if(!isLoggedIn)
        return <>
            <Wrapper>
            <Message className="mb-4">You Need To Login First To Create new Task</Message>
            <Link to="/login"> Login </Link>
            </Wrapper>

        </>



  return (
    <React.Fragment>
        <Wrapper>
              <Message className="mb-4">Welcome , { username }</Message>
          <Link to="/task"> Create Your Task Here </Link>
        </Wrapper>
    </React.Fragment>
  );
}


function Wrapper({ children }) {
    return <div
        className={`
        h-60
        w-auto
        flex
        flex-col
        place-items-center
        place-content-center
        text-3xl
        text-white
        `}>
        { children }
    </div>
}

function Message({ children }) {
    return <h1 className="mb-4 text-black">
        { children }
    </h1>
}
