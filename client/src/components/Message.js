import { useEffect, useState } from "react"

export default function Message({ children }) {


    const [show, setShow] = useState(true);

    useEffect(()=>{

        const timeId = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeId);
        }

    }, []);

    if(!show) return null;

    return <div className="container flex place-content-center place-items-center">
            <div className="bg-red-500 text-white text-center pl-1 w-1/4">
                {children}
            </div>
        </div>
}
