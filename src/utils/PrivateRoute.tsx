import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isLogined: boolean;
  role: string | null;
  element: React.ReactNode;
  fallbackPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isLogined,
  role,
  element,
  fallbackPath,
}) => {
  if (isLogined) {
    if (role === "일반 회원") {
    // 일반 회원일때 admin 막기
    if (location.pathname === "/admin") {
      return <Navigate to="/forbidden" replace />;
    }
    }
    return <React.Fragment>{element}</React.Fragment>;
  } else {
    // 로그인 안했을때
    return <Navigate to={fallbackPath} replace />;
  }
};

export default PrivateRoute;
