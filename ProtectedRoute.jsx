import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './src/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/signin" />;
    }
    return children;
};

export default ProtectedRoute;