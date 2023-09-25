
import { Routes, Route } from "react-router-dom";
import React from "react";
import StudentPage from "./components/StudentPage";
import StaffPage from "./components/StaffPage";
import Employee from "./components/Employee";
import formdata from "./components/Form";
import Login from "./components/Login";
import Dashboard from "./scenes/dashboard";
import DataGridComponents from "./components/DataGridComponents";
import sidebar_mapping from "./sidebar_mapping.json";
import get_config from "./get_config.json";
import UserPage from "./UserPage";

function InternalRoutesRenderer() {
  return (
    <div>
      <Routes>
        {/* Dynamic Student and Staff Routes */}
        {get_config.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={getElementComponent(route.element)}
          />
        ))}
      </Routes>
    </div>
  );
};

function getElementComponent(elementName) {
  switch (elementName) {
    case "Login":
      return <Login />;
    case "StudentPage":
      return <StudentPage />;
    case "StaffPage":
      return <StaffPage />;
    case "Employee":
      return <Employee />;
    default:
      return null;
  }
}
export default InternalRoutesRenderer;