import { useEffect, useRef, useState } from "react";

import { MapContainer, TileLayer } from 'react-leaflet'
import { logout } from "../../app/firebase/authProvider";
import { useGeolocation } from "./hooks/useGeolacation";
import { RecenterMap } from "./DriverPosition";
import { Markers } from "../common/markers/Markers";
import { DriverMarker } from "../common/markers/DriverMarker";
import { FetchingLocation } from "./components/FetchingLocation";
import { ErrorLocation } from "./components/ErrorLocation";
import { updateDriverData } from "../../app/firebase/firestoreProbider";
import { useCheckAuth } from "../auth/hooks/useCheckAuth";



const initLatLng = {
    lat: -38.00022116740122,
    lng: -57.551784619277406,
}

export const DriverPage = () => {

  const [isAvailable, setIsAvailable] = useState(false);
  const { userId } = useCheckAuth()

  const { position: driverPosition, error, loading, isSharing, toggleSharing } = useGeolocation(initLatLng)
  
  const driverPositionRef = useRef(driverPosition);

  useEffect(() => {
    driverPositionRef.current = driverPosition;
  }, [driverPosition]);

  useEffect(() => {
    if (!userId || !isSharing || !isAvailable) return;

    const sendPosition = async () => {
      const { lat, lng } = driverPositionRef.current;
      updateDriverData(userId, { position: { lat, lng } });
    };

    const interval = setInterval(sendPosition, 15000);
    return () => clearInterval(interval);
  }, [userId, isSharing, isAvailable]);


  const handleLogout = () => {
    logout()
  }

  const handleToggleSharingPosition = () => {
    toggleSharing()
    setIsAvailable(false)
  }

  const handleIsAvailable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
    if(userId){
      updateDriverData(userId, { isActive: e.target.checked });
    }
  }

  if (loading) return <FetchingLocation />;
  
  if (error) return <ErrorLocation errorMessage={error} />;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-primary to-secondary">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-white shadow-sm bg-primary">
        <div>
          <h2 className="text-lg text-secondary font-semibold">Juan Pérez</h2>
          <p className="text-sm text-gray-300">Patente: ABC123</p>
        </div>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Salir
        </button>
      </header>

      {/* Body */}
      <main className="flex flex-col flex-1 gap-4 p-4 max-w-xl mx-auto w-full">

        <button 
          // className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-800 cursor-pointer"
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition
            ${isSharing ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}
          onClick={handleToggleSharingPosition}
        >
          {isSharing ? "Dejar de Compartir Ubicación" : "Click para Compartir Ubicación"}
        </button>

        {/* Estado del móvil */}
        {
          isSharing && (
            <div className="flex justify-between items-center border border-white rounded-lg p-4 shadow-sm bg-primary">
              
              <div>
                <label className="block text-sm font-medium text-secondary">
                  Estado:
                </label>
                <p
                  className={`mt-1 font-semibold ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {
                    isSharing
                      ? isAvailable ? "Disponible" : "No disponible"
                      :'Sin Compartir Ubicación '
                  }
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={handleIsAvailable}
                  className="sr-only peer"
                  disabled={!isSharing}
                />
                <div className={`w-11 h-6 ${isSharing?'bg-red-600':'bg-gray-600'} rounded-full peer peer-checked:bg-green-600 transition-colors`}></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          )
        }

        {/* Mapa */}
        <div className="flex-1 border border-white overflow-hidden rounded-lg shadow-sm bg-gray-100 bg-gray-700">

          {

            isSharing
            ?(              
              <MapContainer center={driverPosition} zoom={14} scrollWheelZoom={true}>
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {
                    isAvailable && (
                      <>
                        <RecenterMap position={ driverPosition } />
                        <DriverMarker 
                          position={ driverPosition }
                        />
                      </>
                    )
                  }
                  <Markers />

              </MapContainer>              
            ):(
              <div className="h-full flex justify-center items-center">
                <ErrorLocation errorMessage={null}/>
              </div>
            )
          }
        </div>

        {/* Botón de soporte */}
        <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-800 cursor-pointer">
          Contactar a soporte
        </button>
      </main>
    </div>
  );
}
