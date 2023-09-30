import { useNavigate } from "react-router-dom";
import logo from "../assets/mainIcon.png";
import NavigationMenu from "./NavigationMenu";
import { useEffect, useState } from "react";

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

    const handleSearch = () => {
        navigate('/search')
    }

    const handleSelect = () => {
        navigate('/select')
    }

    const handleAdd = () => {
        navigate('/add')
    }

    return (
        <header>
            <div style={{ display: "flex", alignItems: "center" }}>
                <a href="https://github.com/JeanPtz" target="_blank" rel="noreferrer" style={{ height: "6vh", paddingRight: "0.83vh" }}>
                    <img src={logo} alt="logo" style={{ height: "6vh", width: "6vh", cursor: "pointer" }} />
                </a>
                <div className="verticalDivider" />
                <h1>Fahrtenchronik</h1>
            </div>
            {windowWidth > 820 ?
            <>
                <nav className="navigation">
                    <ul className="navLinks">
                        <li>
                            <a onClick={handleSearch}> Suche </a>
                        </li>
                        <div />
                        <li>
                            <a onClick={handleSelect}> Auswahl </a>
                        </li>
                        <div />
                        <li>
                            <a onClick={handleAdd}> Hinzufügen </a>
                        </li>
                    </ul>
                </nav>
                <NavigationMenu/>
            </>
                : 
                <NavigationMenu/>
            }
        </header>
    )
}

export default Header