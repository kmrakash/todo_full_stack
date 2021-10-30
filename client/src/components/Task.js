import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom"
import { useAuth } from "../context/auth";
import { API } from "../helpers/api"
import Button from "./Button";
import Input from "./Input";

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

    useEffect(  ()=>{

        console.log("Running useEffect....");

        const fetchData = async () => {
            try {
                const res = await API({
                    endpoint: "/api/task"
                }, authTokens);

        // console.log("Fetched Data-->", res);
        setList([...res]);
            } catch (error) {
        console.log("Fetched Error -->", error);
            }
        }

        fetchData();


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
        // setList([])
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
                if(task.uuid === uuid) {
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
                <div className=" flex place-content-center place-items-center">

                <label
                className="w-2/12 px-2 uppercase font-bold"
                    htmlFor="title">
                        Task:
                </label>
                <Input
                    type="text"
                    name="title"
                    className="w-6/12"
                    ref={taskInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                    {
                        editMode ?
                        (<>
                            <Button
                                type="submit"
                                className="mx-2 h-10 bg-blue-400 hover:bg-blue-700"
                                >
                                Edit
                            </Button>

                            <Button
                                type="submit"
                                className="bg-red-700"
                                onClick={handleCancle}
                                >
                                cancle
                            </Button>
                        </>) :
                        (<Button
                            type="submit"
                                className="ml-2 w-3/12 h-10 bg-blue-400 hover:bg-blue-700"
                            // onSubmit={handleSubmit}
                            >
                            create
                        </Button>)
                    }
                </div>
            </form>

            <Box>
                <h1 className="font-bold uppercase" >Your Tasks :</h1>

            {
                list &&
                list.map((task, idx) => {
                    const { uuid , title } = task;
                    return <Items
                        key = {idx}>
                            <p className="ml-1">
                             {title}

                            </p>

                              <Button
                            className="mx-2 bg-blue-400 hover:bg-blue-700"
                               onClick={() => handleEdit({ uuid , title })} >
                               Edit
                               </Button>

                              <Button
                              className="bg-red-400 hover:bg-red-600"
                              onClick={()=>handleDelete(uuid)}>
                              Delete
                              </Button>

                        </Items>
                })
            }
        </Box>
        </React.Fragment>
    );
}

function Items({ children }) {
    return <div className="border-2 border-black bg-white flex space-x-end py-2 mb-1">
        { children }
    </div>
}


function Box({ children }) {
    return <div className="container w-1/2 h-auto bg-red-500">
        <div className="flex flex-col border-4 border-black p-2">
            { children }
        </div>
    </div>
}
