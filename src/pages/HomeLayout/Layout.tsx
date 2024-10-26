import Navbar from "../../components/Navbar"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default HomeLayout