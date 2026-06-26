import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log("token", token);

  return token ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
