import React from "react";
import { useParams } from "react-router-dom";
import StudentPage from "./components/StudentPage";
import StaffPage from "./components/StaffPage";

function UserPage() {
  const { userType, id } = useParams();

  // Render StudentPage or StaffPage based on userType
  if (userType === "Student") {
    return <StudentPage id={id} />;
  } else if (userType === "Staff") {
    return <StaffPage id={id} />;
  } else {
    // Handle other cases or show an error message
    return <div>User not found.</div>;
  }
}

export default UserPage;


//<---------json data-----]


// [ {
//     {
//       "role": "admin",
//       "items": [
//         {
//           "title": "Dashboard",
//           "to": "/home",
//           "icon": " DashboardIcon",
//           "element": "Dashboard"
//         }
//       ]
//     },
//     {
//       "title": "Profile",
//       "items": [
//         {
//           "title": "Students",
//           "to": "/Students",
//           "element": "DataGridComponents",
//           "icon": "ContactsOutlinedIcon",
//           "apiUrl": "Student"

//         },
//         {
//           "title": "Staffs",
//           "to": "/Staffs",
//           "element": "DataGridComponents",
//           "icon": "GroupIcon",
//           "apiUrl": "Staff"

//         }
//       ]
//     },
//     {
//       "title": "Attendance",
//       "items": [
//         {
//           "title": "ApplyLeave",
//           "to": "/ApplyLeave",
//           "icon": "CalendarMonthIcon",
//           "element": "ApplyLeave"
//         },
//         {
//           "title": "LeaveRequests",
//           "to": "/LeaveRequests",
//           "icon": "TimelapseIcon",
//           "element": "LeaveRequests"
//         },
//         {
//           "title": "AdminLeaveApply",
//           "to": "/AdminLeaveApply",
//           "icon": "AdminPanelSettingsIcon",
//           "element": "AdminLeaveApply"
//         }
//       ]
//     },
//     {
//       "title": "Library Management",
//       "items": [
//         {
//           "title": "Library",
//           "to": "/Library",
//           "icon": "PersonOutlinedIcon"
//         },
//         {
//           "title": "Management",
//           "to": "/Management",
//           "icon": "ReceiptOutlinedIcon"
//         }
//       ]
//     },
//     {
//       "role": "employee",
//       "items": [
//         {
//           "title": "Dashboard",
//           "to": "/home",
//           "icon": " DashboardIcon",
//           "element": "Dashboard"
//         }
//       ]
//     },
//     {
//       "title": "Profile",
//       "items": [
//         {
//           "title": "Students",
//           "to": "/Students",
//           "element": "DataGridComponents",
//           "icon": "ContactsOutlinedIcon",
//           "apiUrl": "Student"

//         },
//         {
//           "title": "Staffs",
//           "to": "/Staffs",
//           "element": "DataGridComponents",
//           "icon": "GroupIcon",
//           "apiUrl": "Staff"

//         }
//       ]
//     },
//     {
//       "title": "Attendance",
//       "items": [
//         {
//           "title": "ApplyLeave",
//           "to": "/ApplyLeave",
//           "icon": "CalendarMonthIcon",
//           "element": "ApplyLeave"
//         },
//         {
//           "title": "LeaveRequests",
//           "to": "/LeaveRequests",
//           "icon": "TimelapseIcon",
//           "element": "LeaveRequests"
//         },
//         {
//           "title": "AdminLeaveApply",
//           "to": "/AdminLeaveApply",
//           "icon": "AdminPanelSettingsIcon",
//           "element": "AdminLeaveApply"
//         }
//       ]
//     },
//     {
//       "title": "Library Management",
//       "items": [
//         {
//           "title": "Library",
//           "to": "/Library",
//           "icon": "PersonOutlinedIcon"
//         },
//         {
//           "title": "Management",
//           "to": "/Management",
//           "icon": "ReceiptOutlinedIcon"
//         }
//       ]
//     }
//   }
// ]

//<--------------]



// [
//   {
//     "role": "admin",
//     "items": [
//       {
//         "title": "Dashboard",
//         "to": "/home",
//         "icon": "DashboardIcon",
//         "element": "Dashboard"
//       },
//       {
//         "title": "Attendance Management",
//         "items": [
//           {
//             "title": "Check-in/Check-out",
//             "to": "/Check-in/Check-out",
//             "element": "Check-in/Check-out",
//             "icon": "ContactsOutlinedIcon",
//             "apiUrl": "Check-in/Check-out"
//           }
//         ]
//       },
//       {
//         "title": "Leave Management",
//         "items": [
//           {
//             "title": "Apply Leave",
//             "to": "/ApplyLeave",
//             "icon": "CalendarMonthIcon",
//             "element": "ApplyLeave"
//           },
//           {
//             "title": "Leave History",
//             "to": "/LeaveHistory",
//             "icon": "CalendarMonthIcon",
//             "element": "LeaveHistory"
//           }
//         ]
//       },
//       {
//         "title": "Shift Management",
//         "items": [
//           {
//             "title": "View Shift",
//             "to": "/ViewShift",
//             "icon": "CalendarMonthIcon",
//             "element": "ViewShift"
//           },
//           {
//             "title": "Bulk Assign Shift",
//             "to": "/BulkAssignShift",
//             "icon": "TimelapseIcon",
//             "element": "BulkAssignShift"
//           },
//           {
//             "title": "Assign Shift",
//             "to": "/AssignShift",
//             "icon": "AdminPanelSettingsIcon",
//             "element": "AssignShift"
//           }
//         ]
//       },
//       {
//         "title": "Payroll",
//         "items": [
//           {
//             "title": "Process Salary",
//             "to": "/ProcessSalary",
//             "icon": "PersonOutlinedIcon",
//             "element": "ProcessSalary"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "role": "employee",
//     "items": [
//       {
//         "title": "Attendance Management",
//         "items": [
//           {
//             "title": "Check-in/Check-out",
//             "to": "/Check-in/Check-out",
//             "icon": "CalendarMonthIcon",
//             "element": "Check-in/Check-out"
//           }
//         ]
//       },
//       {
//         "title": "Leave Management",
//         "items": [
//           {
//             "title": "Leave Approval",
//             "to": "/LeaveApproval",
//             "icon": "CalendarMonthIcon",
//             "element": "LeaveApproval"
//           },
//           {
//             "title": "Leave History",
//             "to": "/LeaveHistory",
//             "icon": "TimelapseIcon",
//             "element": "LeaveHistory"
//           }
//         ]
//       },
//       {
//         "title": "Shift Management",
//         "items": [
//           {
//             "title": "View Shift",
//             "to": "/ViewShift ",
//             "icon": "PersonOutlinedIcon",
//             "element": "ViewShift"
//           }
//         ]
//       },
//       {
//         "title": "Payroll",
//         "items": [
//           {
//             "title": "View Salary",
//             "to": "/ViewSalary",
//             "icon": "PersonOutlinedIcon",
//             "element": "ViewSalary"
//           }
//         ]
//       }
//     ]
//   }
// ]