import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardLayout } from "../components/layout";
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeShow from "../components/employee/EmployeeShow";
import EmployeeCreate from "../components/employee/EmployeeCreate";
import EmployeeEdit from "../components/employee/EmployeeEdit";
//organiation
import OrganizationList from "../components/organization/OrganizationList";
import NotificationsProvider from "../hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "../hooks/useDialogs/DialogsProvider";
import AppTheme from "../shared-theme/AppTheme";
import SignIn from "../components/signin/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from "../theme/customizations";

const router = createBrowserRouter([
  {
    path: "/",
    Component: SignIn,
  },
  {
    Component: DashboardLayout,
    children: [
      {
        path: "/employees",
        element: (
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employees/:employeeId",
        element: (
          <ProtectedRoute>
            <EmployeeShow />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employees/new",
        element: (
          <ProtectedRoute>
            <EmployeeCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employees/:employeeId/edit",
        element: (
          <ProtectedRoute>
            <EmployeeEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/org/list",
        element: (
          <ProtectedRoute>
            <OrganizationList />
          </ProtectedRoute>
        ),
      },

      // Fallback route for the example routes in dashboard sidebar items
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function CrudDashboard(props) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
