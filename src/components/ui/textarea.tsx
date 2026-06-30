import { forwardRef, TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    rows: number
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(
    ({ rows, ...rest }, ref) => {
        return (
            <textarea
                rows={rows}
                className="border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-600 focus:outline-none focus:ring-0 py-2 px-0 text-md w-full bg-white resize-none"
                {...rest}
                ref={ref}
            />
        )
    })


Textarea.displayName = "Input";

export default Textarea