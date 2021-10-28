import clsx from "clsx"
export default function Button({children, ...rest}) {

    // console.log("Custom Class for" , children , " is " , rest.className)

    return <button
        {...rest}
        className={ clsx(
            `
            px-2
            text-center
            uppercase
            border-4
            border-blue-600
            bg-blue-500
            hover:bg-blue-700
            hover:text-white
            `,
            rest.className,
            )}
        >
        { children }
    </button>
}
