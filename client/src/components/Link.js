import { Link } from "react-router-dom";

export default function LinkCustom({ children , ...rest   }) {

    console.log("Link Component", children);

    return <Link
        className={`
        border
        p-2
        text-black
        hover:bg-red-700
        hover:text-white
        `}
        {...rest} >
            { children }
        </Link>
}
