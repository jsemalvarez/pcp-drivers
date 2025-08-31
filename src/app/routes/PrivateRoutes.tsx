import { Navigate, Route, Routes } from 'react-router-dom'
import { DriverPage } from '../../features/driver/DriverPage'

export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<DriverPage />} />
        {/* Si accede a una ruta no definida en privado, lo llevamos al dashboard de choferes */}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}