import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";

function ProtectedDashboardAndUpdate({ children }: any) {
  const currentUser = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/sign-in" />;
}

export default ProtectedDashboardAndUpdate;
