import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom"
import { useAuth } from "../context/auth";
import { API } from "../helpers/api"

export default function Task() {

    const [title , setTitle] = useState("");
    const [list , setList] = useState([]);
    const [ isLoading , setIsLoading ] = useState(false);
    const [ isError , setIsError ] = useState(null);
    const { authTokens } = useAuth();
    const [editMode , setEditMode] = useState(false);
    const [ taskuuid, setTaskuuid ] = useState(null);
    // console.log(title);
    const taskInput = useRef(null);

    useEffect( async ()=>{

        console.log("Running useEffect....");

        try {
            const res = await API({
                endpoint : "/api/task"
            }, authTokens);

            // console.log("Fetched Data-->", res);
            setList([...res]);
        } catch (error) {
            console.log("Fetched Error -->", error);
        }

    },[setList, authTokens])


    const handleSubmit = async (e) => {
        console.log("----New Task Creation---------")
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
            setList([...list , response]);

        } catch (error) {
            setIsError(error);
            console.log(error);
        }
        setIsLoading(false);
        setTitle("");
    }


    const handleDelete = async (uuid) => {

        console.log("To be Deleted UUID-->", uuid);
        try {
            const res = await API({
                endpoint : "/api/task/delete",
                method : "DELETE",
                data : {uuid}
            }, authTokens)

            console.log(res);

            const newList = list.filter((l) => l.uuid !== uuid);
            setList(newList);

        } catch (error) {
            console.log("Delete Error -->", error);
        }

    }

    const handleEdit = ({ title , uuid }) => {

        setEditMode(true)
        setTitle(title);
        setTaskuuid(uuid);
        taskInput.current.focus();

    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const isComplete = false;
        const uuid = taskuuid;
        try {
            const res = await API({
                endpoint: "/api/task/edit",
                method : "PUT",
                data : { title , isComplete , uuid }
            }, authTokens)


            console.log(res);

            const newList = list.map(task => {
                if(task.uuid == uuid) {
                    return { ...task , title , isComplete };
                }
                return task;
            });


            setList(newList);

        } catch (error) {
            console.log("Edit Error -->", error);
        }

        setTitle("");
        setEditMode(false);
        setTaskuuid(null)
    }

    const handleCancle = () => {
        setEditMode(false)
        setTitle("")
        setTaskuuid(null)
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

            <form  onSubmit = { editMode ? handleEditSubmit : handleSubmit  }>
                <label
                    htmlFor="title">
                        Task:
                </label>
                <input
                    type="text"
                    name="title"
                    ref={taskInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                    {
                        editMode ?
                        (<>
                            <button
                                type="submit"
                                // onSubmit={handleEditSubmit}
                                >
                                Edit
                            </button>

                            <button
                                type="submit"
                                onClick={handleCancle}
                                >
                                cancle
                            </button>
                        </>) :
                        (<button
                            type="submit"
                            // onSubmit={handleSubmit}
                            >
                            create
                        </button>)
                    }

            </form>


            {
                list &&
                list.map((task, idx) => {
                    const { uuid , title } = task;
                    return <li
                        key = {idx}>
                             {title}
                              <button onClick={() => handleEdit({ uuid , title })} > Edit </button>
                              <button onClick={()=>handleDelete(uuid)}> Delete </button>
                             </li>
                })
            }

        </React.Fragment>
    );
}
