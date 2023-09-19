import { useNavigate } from "react-router-dom";
import logo from "../assets/JeanPtzLogo.png";

const Header = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <header>
            <div style={{display: "flex", alignItems: "center"}}>
                <a href="https://github.com/JeanPtz" target="_blank" rel="norefferer" style={{height: "6.64vh", paddingRight: "0.83vh"}}>
                    <img src={logo} alt="logo" style={{height: "6.64vh", width: "6.64vh", cursor: "pointer"}}/>
                </a>
                <div className="verticalDivider"/>
                <h1 style={{ color: "#edf0f1", paddingLeft: "0.83vh", fontSize: " 3.53vh" }}>Fahrtenchronik</h1>
            </div>
            <nav>
                <ul className="navLinks">
                    <li>
                        <a onClick={handleNavigate}> Search </a>
                    </li>
                    <div/>
                    <li>
                        <a onClick={handleNavigate}> Pick </a>
                    </li>
                    <div/>
                    <li>
                        <a onClick={handleNavigate}> About </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header