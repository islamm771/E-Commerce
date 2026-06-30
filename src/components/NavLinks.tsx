import { ILoggedUser } from "@/interface";
import NavLink from "./ui/Navlink";

const navLinks = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "contact",
    href: "/contact",
  },
  {
    title: "about",
    href: "/about",
  },
  // {
  //   title: "dashboard",
  //   href: "/dashboard",
  // },
  {
    title: "login",
    href: "/login",
  },
  {
    title: "register",
    href: "/register",
  },
]
const NavLinks = ({ userData }: { userData: ILoggedUser | null }) => {
  return (
    <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-sm">
      {navLinks.map((link, idx) => {
        if (userData && (link.title === "login" || link.title === "register")) return null
        return (
          <li key={idx}>
            <NavLink href={link.href}>
              {link.title}
            </NavLink>
          </li>
        )
      })}
    </ul>
  );
};

export default NavLinks