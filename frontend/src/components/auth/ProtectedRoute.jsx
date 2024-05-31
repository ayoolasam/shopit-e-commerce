import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, Loading } = useSelector((state) => state.auth);

  if (Loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
