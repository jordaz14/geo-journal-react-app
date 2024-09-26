import { TileLayer, useMap, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect } from "react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapComponent = ({ coords }: { coords: { lat: number; lng: number } }) => {
  const map = useMap();

  useEffect(() => {
    if (coords.lat && coords.lng) {
      map.setView([coords.lat, coords.lng], map.getZoom());
    }
  }, [coords, map]);

  return (
    <>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
      />
      <Marker
        position={[coords.lat, coords.lng]}
        icon={
          new Icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIconRetina,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
      />
    </>
  );
};

export default MapComponent;
