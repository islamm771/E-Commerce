import { useEffect } from "react";
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useTranslation } from "react-i18next";
import "./i18n";
import cookies from "./services/CookieService";

const App = () => {
  const { i18n } = useTranslation();

  const lang = cookies.get("i18next") || "en"; // Fallback to "en" if not set

  useEffect(() => {
    document.dir = i18n.dir();
  }, [lang]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App