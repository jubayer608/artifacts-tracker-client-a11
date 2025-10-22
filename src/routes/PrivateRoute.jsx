import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signIn" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
