import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Demonstrates: Protected Routes, Component Composition, and Conditional Redirection (<Navigate />).
 *
 * @param {boolean} isAllowed - Boolean condition indicating if user has permission
 * @param {string} redirectPath - Route to redirect to if unauthorized (default '/')
 * @param {React.ReactNode} children - Optional children component
 */
export default function ProtectedRoute({ isAllowed, redirectPath = '/', children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
