import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import CrudDashboard from "../crud-dashboard/CrudDashboard";
import SignIn from "../sign-in/SignIn";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignIn />
  </StrictMode>
);
