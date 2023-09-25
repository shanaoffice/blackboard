import { Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import StudentPage from "./components/StudentPage";
import StaffPage from "./components/StaffPage";
import Dashboard from "./scenes/dashboard";
import DataGridComponents from "./components/DataGridComponents";
import sidebar_mapping from "./sidebar_mapping.json";
import UserPage from "./UserPage";
import get_config from "./get_config.json";
import ApplyLeave from "./components/ApplyLeave"
import LeaveRequests from "./components/LeaveRequests"
import AdminLeaveApply from "./components/AdminLeaveApply"
import LogTable from "./components/LogTable"
import Form from "./components/Form"
import Bulk from "./components/Bulk"
import Shift from "./components/Shift"
import Viewshift from "./components/Viewshift"
import Employee from "./components/Employee"
import HomePage from "./components/HomePage"
import Payslip from "./components/Payslip";
import PayrollTable from "./components/PayrollTable"

function SidebarRouteRendere() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const filteredData = sidebar_mapping.find((item) => item.role === role);

  if (!filteredData) {
    // Handle the case where the role is not found in the data
    return null;
  }

  const { side_bar_items } = filteredData;
  return (
    <div>
      <Routes>
        {/* Sidebar Routes */}
        {side_bar_items.map((section, sectionIndex) =>
          section.items.map((item, itemIndex) => (
            <Route
              key={sectionIndex + itemIndex}
              path={item.to}
              element={getSidebarElementComponent(item.element, item.apiUrl)}
            />
          ))
        )}
      </Routes>
    </div>
  );
}
function getSidebarElementComponent(elementName, apiUrl) {
  switch (elementName) {
    case "DataGridComponents":
      return <DataGridComponents apiUrl={apiUrl} />;
    case "HomePage":
      return <HomePage />;
    case "Employee":
      return <Employee />;
    case "ApplyLeave":
      return <ApplyLeave />;
    case "LeaveRequests":
      return <LeaveRequests />;
    case "AdminLeaveApply":
      return <AdminLeaveApply />;
    case "LogTable":
      return <LogTable />;
    case "Form":
      return <Form />;
    case "Bulk":
      return <Bulk />;
    case "Shift":
      return <Shift />;
    case "Viewshift":
      return <Viewshift />;
      case "Payslip":
      return <Payslip />;
      case "PayrollTable":
      return <PayrollTable />;
    default:
      return null;
  }
}
export default SidebarRouteRendere;