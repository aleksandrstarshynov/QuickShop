import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Компонент для защиты маршрута
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Проверяем наличие токена

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />} // Если нет токена, перенаправляем на login
    />
  );
};

export default PrivateRoute;
