import clsx from "clsx"
export default function Button({children, ...rest}) {

    // console.log("Custom Class for" , children , " is " , rest.className)


    return <button
        {...rest}
        className={ clsx(
            `
            h-8
            px-2
            text-center
            uppercase
            border-1
            text-white
            `,
            rest.className,
            )}
        >
        { children }
    </button>
}
