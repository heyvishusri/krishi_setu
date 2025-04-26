// components/ProtectedRoute.jsx (Example Structure)
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  let userInfo = null;
  try {
    // Check if user info exists and has a token
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
    }
  } catch (e) {
    console.error("Error parsing userInfo in ProtectedRoute", e);
    localStorage.removeItem("userInfo"); // Clear corrupted data
  }

  // If no userInfo or no token, redirect to login
  if (!userInfo || !userInfo.token) {
    console.log("ProtectedRoute: No user/token found, redirecting to login.");
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the child component (e.g., <Profile />)
  console.log("ProtectedRoute: User authenticated, rendering children.");
  return children;
};

export default ProtectedRoute;
