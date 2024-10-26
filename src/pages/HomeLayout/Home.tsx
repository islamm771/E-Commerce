import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation()
    return (
        <>
            <h1>{t("Home Page")}</h1>
        </>
    )
}

export default HomePage