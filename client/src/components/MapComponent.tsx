import { TileLayer, useMap, Marker } from "react-leaflet";
import { useEffect } from "react";

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
      <Marker position={[coords.lat, coords.lng]} />
    </>
  );
};

export default MapComponent;
