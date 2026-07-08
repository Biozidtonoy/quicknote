import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { getToken } from "../services/authStorage";


type ProtectedRouteProps = {

    children: ReactNode;

};

function ProtectedRoute({children}: ProtectedRouteProps) {

    const token = getToken();
    const isAuthenticated = !!token;
    console.log(isAuthenticated);
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return (
        <>
            {children}
        </>
    );

}

export default ProtectedRoute;