import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../../features/auth/LoginPage"

export const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Si accede a una ruta no definida en público, lo llevamos a Home */}
        <Route path="*" element={<Navigate to="/public/login" />} />
    </Routes>
  )
}
