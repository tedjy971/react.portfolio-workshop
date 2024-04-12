import styles from "./ToggleThemeButton.module.css";
import {MdOutlineModeNight, MdOutlineWbSunny} from "react-icons/md";
import clsx from "clsx";
import {useTheme} from "../context/ThemeProvider";
import {useEffect} from "react";

export const ToggleThemeButton = () => {

    const {theme, toggleTheme} = useTheme();

    const isDark = theme === "dark";
    const isLight = theme === "light";

    useEffect(() => {
        // add to localstorage
        localStorage.setItem("theme", theme);
    }, [theme]);
    const switchTheme = () => {
        toggleTheme();
    }

    return (
        <div className="overflow-hidden relative p-2 rounded-full border-primary">
            <MdOutlineWbSunny
                onClick={switchTheme}
                className={clsx("relative h-6 w-6 cursor-pointer text-primary", {
                    [styles.enter]: isLight,
                    [styles.exit]: isDark,
                })}
            />
            <MdOutlineModeNight
                onClick={switchTheme}
                className={clsx("absolute top-2 h-6 w-6 cursor-pointer text-primary", {
                    [styles.enter]: isDark,
                    [styles.exit]: isLight,
                })}
            />
        </div>
    );
};
