import { MutableRefObject, useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer} from 'react-leaflet';
import { LatLngExpression, LatLngTuple, Map as MapProp, control, tileLayer } from 'leaflet'

interface MapComponentProps {
  coordinates: LatLngTuple[]
  position: LatLngTuple;
}

const Map: React.FC<MapComponentProps> = ({ coordinates, position }) => {
    const [map, setMap] = useState<MapProp | null>(null);

    useEffect(() => {

      if (!map) return

      map!!.flyTo(position)

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
  
      const satellite = tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=NuVgYUCkk9cdnbhnTeTS', {
          attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
  
      control.layers({
          "Open Street Map": osm,
          "GeoApi": geoapi,
          "GeoApi (toner)": geoapi_toner,
          "Satellite": satellite
      }).addTo(map)
       
    }, [map]);

    useEffect(() => {
      if (!map) return
      map!!.flyTo(position)
       
    });
    
  
    return (
      <MapContainer center={position} zoom={15} ref={setMap} style={{height: "100%", width: "100%"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />
        <Polyline positions={coordinates} color="blue" weight={3} />
      </MapContainer>
    );
  };

export default Map
  