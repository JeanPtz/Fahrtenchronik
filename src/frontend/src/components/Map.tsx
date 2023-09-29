import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Map = () => {
    const [gpxData, setGpxData] = useState(null);
  
    useEffect(() => {
    }, []);
  
    return (
      <MapContainer style={{height: "100%", width: "100%"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {gpxData && (
          <GeoJSON data={gpxData}>
            {/* Add optional styling for your GPX data */}
          </GeoJSON>
        )}
      </MapContainer>
    );
  };

export default Map
  