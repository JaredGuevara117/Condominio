import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Usuario en ProtectedRoute:", user); // Ver qué se está obteniendo del localStorage

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.rol !== allowedRole) { // Asegúrate de que aquí usas `rol` o `role` según corresponda
    console.log(`Redirigiendo: ${user.rol} no tiene permiso para ${allowedRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
};



export default ProtectedRoute;
