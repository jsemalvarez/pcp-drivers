import { useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { logout } from "../../app/firebase/authProvider";

const initLatLng = {
    lat: -38.00022116740122,
    lng: -57.551784619277406,
}

export const DriverPage = () => {

  const [available, setAvailable] = useState(false);

  const handleLogout = () => {
    logout()
  }

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
        {/* Estado del móvil */}
        <div className="flex justify-between items-center border border-white rounded-lg p-4 shadow-sm bg-primary">
          <div>
            <label className="block text-sm font-medium text-secondary">
              Estado:
            </label>
            <p
              className={`mt-1 font-semibold ${
                available ? "text-green-600" : "text-red-600"
              }`}
            >
              {available ? "Disponible" : "No disponible"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-red-600 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Mapa */}
        <div className="flex-1 border border-white overflow-hidden rounded-lg shadow-sm bg-gray-100">
          <MapContainer center={initLatLng} zoom={14} scrollWheelZoom={true}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {
                available && (
                  <Marker position={initLatLng}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                )
              }

          </MapContainer>
        </div>

        {/* Botón de soporte */}
        <button className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-800 cursor-pointer">
          Contactar a soporte
        </button>
      </main>
    </div>
  );
}
