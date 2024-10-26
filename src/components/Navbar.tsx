
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/login", label: "Login" },
];


const Navbar = () => {
    const { i18n, t } = useTranslation()

    const handleOnSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        i18n.changeLanguage(value)
    }
    return (
        <nav className="bg-white p-3">
            <div className="container flex justify-between">
                <Link to={"#"}>Logo</Link>
                <ul className="flex gap-4">
                    {menuItems.map(({ path, label }) => (
                        <li key={label}>
                            <NavLink to={path}>{t(label)}</NavLink>
                        </li>
                    ))}
                </ul>

                <select name="" id="" defaultValue={i18n.language} onChange={handleOnSelectChange}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>

            </div>
        </nav>
    )
}

export default Navbar