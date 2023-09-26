import { useNavigate } from "react-router-dom";
import logo from "../assets/JeanPtzLogo.png";
import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";

const Header = () => {

    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <header>
            <div style={{ display: "flex", alignItems: "center" }}>
                <a href="https://github.com/JeanPtz" target="_blank" rel="norefferer" style={{ height: "6.64vh", paddingRight: "0.83vh" }}>
                    <img src={logo} alt="logo" style={{ height: "6.64vh", width: "6.64vh", cursor: "pointer" }} />
                </a>
                <div className="verticalDivider" />
                <h1 style={{ color: "#edf0f1", paddingLeft: "0.83vh", fontSize: " 3.53vh" }}>Fahrtenchronik</h1>
            </div>
            {windowWidth > 700 ?
            <>
                <nav>
                    <ul className="navLinks">
                        <li>
                            <a onClick={handleNavigate}> Suche </a>
                        </li>
                        <div />
                        <li>
                            <a onClick={handleNavigate}> Auswahl </a>
                        </li>
                        <div />
                        <li>
                            <a onClick={handleNavigate}> Hinzufügen </a>
                        </li>
                    </ul>
                </nav>
                <NavigationMenu/>
            </>
                : <NavigationMenu />
            }
        </header>
    )
}

export default Header