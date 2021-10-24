import React, { useState } from "react";
// import { Link } from "react-router-dom"
import { useAuth } from "../context/auth";
import { API } from "../helpers/api"

export default function Task() {

    const [title , setTitle] = useState("");
    const [list , setList] = useState(null);
    const [ isLoading , setIsLoading ] = useState(false);
    const [ isError , setIsError ] = useState(null);
    const { authTokens } = useAuth();
    // console.log(title);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title);

        setIsLoading(true);
        try {
          const response = await API({
                endpoint: "/api/task/create",
                method: "POST",
                data: {title}
            }, authTokens)

            console.log(response);

        } catch (error) {
            setIsError(error);
            console.log(error);
        }
        setIsLoading(false);
    }

    if(isError) return (<>
        <h1>Something went wrong</h1>
    </>);

    if(isLoading) return (
        <>
            <h1>Loading ...</h1>
        </>
    )



    return (
        <React.Fragment>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Task: </label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit"> create </button>
            </form>


            {
                list &&
                list.map((task, idx) => {
                    return <li key = {idx}> task.title </li>
                })
            }

        </React.Fragment>
    );
}
