import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({admin, children }) => {
 
  const { isAuthenticated,user, Loading ,} = useSelector((state) => state.auth);

  if (Loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(admin && user?.role !== "admin"  ){
return <Navigate to="/" replace />;
  } 
  return children;
};

export default ProtectedRoute;
