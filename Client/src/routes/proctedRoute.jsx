import React from 'react';
import { Navigate } from 'react-router-dom';
import authservice from "../service/authService";
const ProtectedRoute = ({ children }) => {
    const token = authservice.getToken(); 
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;