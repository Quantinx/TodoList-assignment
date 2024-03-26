import { Outlet, Navigate } from "react-router-dom";
import { TaskProviderContext } from "../provider/TaskProvider";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { loggedIn } = useContext(TaskProviderContext);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
