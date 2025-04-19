import { Navigate, Outlet } from "react-router-dom";
// @ts-ignore
const PrivateRoute = ({ isAuthenticated, redirectPath = "/login" }) => {

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;