import clsx from "clsx"
import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {

    return <input
    {...props}
        className={clsx(`
            py-2 pl-2
            border-4 rounded-lg border-gray-200
            text-gray-700
            focus:outline-none
            focus:border-4
            focus:border-blue-700 `,
            props.className
        )}
    ref={ref} />})

export default Input;

