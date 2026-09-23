import {
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

import Complaints from "../pages/Complaints";
import ComplaintDetails from "../pages/ComplaintDetails";
import AddComplaint from "../pages/AddComplaint";
import EditComplaint from "../pages/EditComplaint";

import Officers from "../pages/Officers";
import OfficerDetails from "../pages/OfficerDetails";

import SavedComplaints from "../pages/SavedComplaints";

import Statistics from "../pages/Statistics";

import EmergencyContacts from "../pages/EmergencyContacts";

import CitizenServices from "../pages/CitizenServices";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (

    <Routes>

      {/* PUBLIC */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

      <Route
        path="/emergency-contacts"
        element={<EmergencyContacts />}
      />

      <Route
        path="/citizen-services"
        element={<CitizenServices />}
      />

      {/* PROTECTED */}

      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/complaints/:id"
        element={
          <ProtectedRoute>
            <ComplaintDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-complaint"
        element={
          <ProtectedRoute>
            <AddComplaint />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-complaint/:id"
        element={
          <ProtectedRoute>
            <EditComplaint />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officers"
        element={
          <ProtectedRoute>
            <Officers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officers/:id"
        element={
          <ProtectedRoute>
            <OfficerDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-complaints"
        element={
          <ProtectedRoute>
            <SavedComplaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;