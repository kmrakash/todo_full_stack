import clsx from "clsx"
export default function Button({children, ...rest}) {

    // console.log("Custom Class for" , children , " is " , rest.className)

    const { color } = rest;

    return <button
        {...rest}
        className={ clsx(
            `
            px-2
            text-center
            uppercase
            border-1
            bg-${color}-500
            text-white
            hover:bg-${color}-700
            `,
            rest.className,
            )}
        >
        { children }
    </button>
}
