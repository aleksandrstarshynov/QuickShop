import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Route Protection Component
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Checking for the presence of a token

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />} // If there is no token, redirect to login
    />
  );
};

export default PrivateRoute;
