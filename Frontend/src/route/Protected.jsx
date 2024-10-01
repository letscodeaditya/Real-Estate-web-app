import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  const auth = localStorage.getItem("user");

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default Protected;
