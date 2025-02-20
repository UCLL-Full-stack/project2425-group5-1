import { useRouter } from "next/router";
import LanguageIcon from '@mui/icons-material/Language';
import styles from "@/styles/settings/Language.module.css";
import { useState } from "react";
import { useTranslation } from "next-i18next";

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const [language, setLanguage] = useState<string>("en");
    const { t } = useTranslation();

    const handleLanguageChange = (loc: string) => {
        const newLocale = loc;
        setLanguage(loc);
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <>
            <div className={styles.container}>
                <p onClick={() => handleLanguageChange("en")} style={{ fontSize: "1.2rem" }} className={`${styles.content} ${language === "en" ? styles.active : ""}`}>en</p>
                <p onClick={() => handleLanguageChange("nl")} style={{ fontSize: "1.2rem" }} className={`${styles.content} ${language === "nl" ? styles.active : ""}`}>nl</p>
            </div>
        </>
    );
};

export default Language;