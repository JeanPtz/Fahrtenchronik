import { useNavigate } from "react-router-dom";
import logo from "../assets/mainIcon.png";
import NavigationMenu from "./NavigationMenu";
import { useEffect, useState } from "react";

const Header = () => {

    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const currentURL = window.location.pathname;

    // Check if the current URL ends with "Search"
    const isSearchPage = currentURL.endsWith('/search');
    const isSelectPage = currentURL.endsWith('/select');
    const isAddPage = currentURL.endsWith('/add');

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
            {windowWidth > 1040 ?
                <>
                    <nav className="navigation">
                        <ul className="navLinks">
                            <li>
                                <a onClick={handleSearch} style={{color: isSearchPage ? '#0088a9' : ''}}> Suche </a>
                            </li>
                            <div />
                            <li>
                                <a onClick={handleSelect} style={{color: isSelectPage ? '#0088a9' : ''}}> Auswahl </a>
                            </li>
                            <div />
                            <li>
                                <a onClick={handleAdd} style={{color: isAddPage ? '#0088a9' : ''}}> Hinzufügen </a>
                            </li>
                        </ul>
                    </nav>
                    <NavigationMenu />
                </>
                :
                <NavigationMenu />
            }
        </header>
    )
}

export default Header