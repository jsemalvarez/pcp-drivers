import { useEffect, useState } from "react";
import { onCheckAuthAdapter } from "../../../app/firebase/authProvider";


export const useCheckAuth = () => {

    const [checking, setChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // usamos el adapter en vez de firebase directamente
    const unsubscribe = onCheckAuthAdapter((user) => {
      setIsAuthenticated(!!user);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);
  
    return { checking, isAuthenticated };
}