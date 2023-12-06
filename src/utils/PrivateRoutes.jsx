import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = localStorage.getItem("access_token"); // Use curly braces to define the object
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    );
}

export default PrivateRoutes;