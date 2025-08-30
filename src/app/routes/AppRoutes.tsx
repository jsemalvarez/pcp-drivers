import { Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

export const AppRoutes = () => {

    const isAuthenticated:boolean = false;

    return (
        <Routes>
            {
                (isAuthenticated)
                ? <Route path="/*" element={ <PrivateRoutes /> } />
                : <Route path="/public/*" element={ <PublicRoutes /> } />
            }
            {/* Si accede a una ruta desconocida, lo redirigimos */}
            <Route 
                path='/*' 
                element={ <Navigate to={isAuthenticated ? "/" : "/public"} /> } 
            />
        </Routes>
    )
}
