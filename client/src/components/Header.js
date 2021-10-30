import { Link } from "react-router-dom"
import { useAuth } from "../context/auth"
import Button from "./Button"

export default function Header({logout, authTokens})  {

    const { username } = useAuth();

    return (
        <>
            <nav className="container mx-auto pt-2 h-16">
                <ul className="flex place-content-between">
                    <li>
                        <Link to="/" className="text-lg uppercase text-bold" >Home Page</Link>
                    </li>

                    {!authTokens ? (
                        <li>
                            <Button color="blue">
                            <Link to="/login">Login</Link>
                            </Button>
                        </li>
                    ) : (
                        <>
                        <div className="flex w-1/2 place-content-around">


                        <li>
                            Username : <span className="font-bold ">{username} </span>
                        </li>

                        <li>
                            <Button color="blue" onClick={logout}>Logout</Button>
                        </li>
                                </div>
                        </>
                    )}
                </ul>
            </nav>
        </>
    )
}
