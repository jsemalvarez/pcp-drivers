import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

type Props = {
  position: LatLngExpression;
};

export const RecenterMap = ({ position }: Props) => {
  const map = useMap();

  useEffect(() => {
    // map.setView(position); // centra el mapa en la nueva posición
    map.flyTo(position, map.getZoom(), { animate: true }); // centra el mapa en la nueva posición
  }, [position, map]);

  return null;
}
