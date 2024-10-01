import { Outlet, Navigate } from "react-router-dom";

const AdminProtected = () => {
  const auth = localStorage.getItem("admin");

  return <>{auth ? <Outlet /> : <Navigate to="/admin-login" />}</>;
};

export default AdminProtected;
