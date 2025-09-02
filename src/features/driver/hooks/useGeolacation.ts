import { useEffect, useRef, useState } from "react";

type Position = { lat: number; lng: number };

type UseGeolocationReturn = {
  position: Position;
  error: string | null;
  loading: boolean;
  isSharing: boolean;
  toggleSharing: () => void;
};

export const useGeolocation = (initLatLng: Position): UseGeolocationReturn => {
  const [position, setPosition] = useState<Position>(initLatLng);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const watchId = useRef<number | null>(null);

  const stopSharing = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setIsSharing(false);
  };

  const toggleSharing = () => {
    if (isSharing) {
      stopSharing();
    } else {
      if (!("geolocation" in navigator)) {
        setError("La geolocalización no está soportada en este navegador");
        return;
      }

      setLoading(true);
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setError(null);
          setLoading(false);
          setIsSharing(true);
        },
        (err) => {
          if (err.code === 1) {
            setError("El usuario denegó el permiso de geolocalización");
          } else if (err.code === 2) {
            setError("La posición no está disponible");
          } else if (err.code === 3) {
            setError("La solicitud de geolocalización expiró");
          } else {
            setError(err.message);
          }
          setLoading(false);
          stopSharing(); // 🔴 si falla, nos aseguramos de marcar que no se comparte
        },
        { 
          enableHighAccuracy: true,   // fuerza máxima precisión (usa GPS, más batería)
          maximumAge: 0,              // siempre pide coordenadas nuevas
          // maximumAge: 1000,        // acepta posiciones cacheadas de hasta 1s
          timeout: 5000               // espera máx 5s antes de fallar
        }
      );
    }
  };


  // 🧹 Cleanup
  useEffect(() => {
    return () => stopSharing();
  }, []);

  // 👀 Escuchar cambios en los permisos
  useEffect(() => {
    let permissionStatus: PermissionStatus;

    const checkPermission = async () => {
      try {
        permissionStatus = await navigator.permissions.query({ name: "geolocation" as PermissionName });

        const handleChange = () => {
          if (permissionStatus.state === "denied") {
            setError("Permisos de geolocalización quitados");
            stopSharing();
          }
        };

        permissionStatus.onchange = handleChange;
      } catch (err) {
        console.warn("Permissions API no soportada en este navegador", err);
      }
    };

    checkPermission();

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, []);

  return { position, error, loading, isSharing, toggleSharing };
};
