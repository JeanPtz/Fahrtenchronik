import { TextField } from "@mui/material"
import Map from "../components/Map"

const SearchPage = () => {

    return (
        <div className="searchLayout" style={{display: "flex", height: "100%"}}>
            <div className="searchMapView" style={{flex: 4, padding: "px"}}>
                <Map/>
            </div>
            <div className="searchInputs" style={{flex: 1, backgroundColor: "gray"}}>
                <TextField/>
            </div>
        </div>
    )
}

export default SearchPage