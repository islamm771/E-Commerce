import { ReactNode } from "react"
import SectionHeader from "./SectionHeader"

interface IProps {
    children: ReactNode,
    title: string,
    classes?: string
}

const Wrapper = ({ children, title, classes = "py-8" }: IProps) => {

    return <div className={`container ${classes} mx-auto px-8 xl:px-24`}>
        <SectionHeader title={title} />
        {children}
    </div>
}


export default Wrapper