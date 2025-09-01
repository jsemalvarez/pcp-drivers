import { Navigate, Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { useCheckAuth } from "../../features/auth/hooks/useCheckAuth"

export const AppRoutes = () => {

    const { checking, isAuthenticated } = useCheckAuth()

    if(checking){
        return(
            <p>Cargando...</p>
        )
    }

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
