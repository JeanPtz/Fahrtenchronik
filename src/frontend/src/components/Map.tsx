import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer} from 'react-leaflet';
import { LatLngTuple, Map as MapProp, Polyline as PolylineProp, control, tileLayer } from 'leaflet'

interface MapComponentProps {
  coordinates: LatLngTuple[]
}

const Map: React.FC<MapComponentProps> = ({ coordinates }) => {
    const [map, setMap] = useState<MapProp | null>(null);
    const [polyline, setPolyline] = useState<PolylineProp | null>(null);

    useEffect(() => {

      if (!map) return

      const osm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      map.addLayer(osm)
  
      const geoapi = tileLayer(
          'https://maps.geoapify.com/v1/tile/maptiler-3d/{z}/{x}/{y}.png?&apiKey=a339a8368e0442e1854b43a07f97d494', {
          attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
  
      const geoapi_toner = tileLayer(
          'https://maps.geoapify.com/v1/tile/toner/{z}/{x}/{y}.png?&apiKey=a339a8368e0442e1854b43a07f97d494', {
          attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
  
      const satellite = tileLayer(
          'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoibGVldHd1Y2giLCJhIjoiY2w5NHhrbHh3MjNyMDN4cDJzemhjZmZhdSJ9.-dYGb8O8_hUeVS5nYHyrhg', {
          attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
      });
  
      control.layers({
          "Open Street Map": osm,
          "GeoApi": geoapi,
          "GeoApi (toner)": geoapi_toner,
          "Satellite": satellite
      }).addTo(map)
       
    }, [map]);

    useEffect(() => {
      if (!map) return
      map!!.flyToBounds(polyline!!.getBounds())
    }, [coordinates]);
    
  
    return (
      <MapContainer center={[51.480842, 7.224831]} zoom={15} ref={setMap} style={{height: "100%", width: "100%"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
        <Polyline positions={coordinates} ref={setPolyline} color="blue" weight={3} />
      </MapContainer>
    );
  };

export default Map
  