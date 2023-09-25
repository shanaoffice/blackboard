import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Avatar from "@mui/material/Avatar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import GroupIcon from '@mui/icons-material/Group';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import sidebar_mapping from "../../sidebar_mapping.json";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  const [role] = useState(localStorage.getItem("role"));

  const filteredData = sidebar_mapping.find((item) => item.role === role);

  if (!filteredData) {
    // Handle the case where the role is not found in the data
    return null;
  }

  const { side_bar_items } = filteredData;
  console.log(side_bar_items)

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar
                    alt="avatar"
                    src="moneta.jpeg"
                    sx={{ width: "100px", height: "100px", border: "2px solid #81BC44" }}
                  />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 MONETA
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {side_bar_items.map((section, index) => (
              <React.Fragment key={index}>
                {section.title && (   // title =>Get profile and attendance ("Typography") from the json file.
                  <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                    {section.title}
                  </Typography>
                )}
                {section.items.map((item, itemIndex) => (
                  <Item
                    key={itemIndex}
                    title={item.title}
                    to={item.to}
                    icon={getIconComponent(item.icon)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
function getIconComponent(iconName) {
  switch (iconName) {
    case "PeopleOutlinedIcon":
      return <PeopleOutlinedIcon />;
    case "ContactsOutlinedIcon":
      return <ContactsOutlinedIcon />;
    case "GroupIcon":
      return <GroupIcon />;
    case "PersonOutlinedIcon":
      return <PersonOutlinedIcon />;
    case "TimelapseIcon":
      return <TimelapseIcon />;
    case "CalendarMonthIcon":
      return <CalendarMonthIcon />;
    case "AdminPanelSettingsIcon":
      return <AdminPanelSettingsIcon />;
    case "PendingActionsIcon":
      return <PendingActionsIcon />;
    case "MoreTimeIcon":
      return <MoreTimeIcon />;
    case "DashboardIcon":
      return <DashboardIcon />;
    case "CurrencyRupeeIcon":
      return <CurrencyRupeeIcon />;
    default:
      return null;
  }
}
export default Sidebar;





// import React, { useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import Avatar from "@mui/material/Avatar";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import sidebar_mapping from "../../sidebar_mapping.json";

// // ... (your icon imports and getIconComponent function)

// // const Item = ({ title, to, icon, selected, setSelected }) => {
// //   const theme = useTheme();
// //   const colors = tokens(theme.palette.mode);
// //   return (
// //     <MenuItem
// //       active={selected === title}
// //       style={{
// //         color: colors.grey[100],
// //       }}
// //       onClick={() => setSelected(title)}
// //       icon={icon}
// //     >
// //       <Typography>{title}</Typography>
// //       <Link to={to} />
// //     </MenuItem>
// //   );
// // };


// const Sidebar = ({ role }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState("Dashboard");

//   const filteredRoles = sidebar_mapping.filter((item) =>
//     item.role ? item.role === role : true
//   );

//   return (
//     <Box
//       sx={{
//         "& .pro-sidebar-inner": {
//           background: `${colors.primary[400]} !important`,
//         },
//         "& .pro-icon-wrapper": {
//           backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//           padding: "5px 35px 5px 20px !important",
//         },
//         "& .pro-inner-item:hover": {
//           color: "#868dfb !important",
//         },
//         "& .pro-menu-item.active": {
//           color: "#6870fa !important",
//         },
//       }}
//     >
//       <ProSidebar collapsed={isCollapsed}>
//         <Menu iconShape="square">
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//             style={{
//               margin: "10px 0 20px 0",
//               color: colors.grey[100],
//             }}
//           >
//             {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Typography variant="h3" color={colors.grey[100]}></Typography>
//                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>

//           {!isCollapsed && (
//             <Box mb="25px">
//               <Box mb="25px">
//                 <Box display="flex" justifyContent="center" alignItems="center">
//                   {/* <Avatar
//                     alt="Profile-std"
//                     src="school.jpg"
//                     sx={{ width: "100px", height: "100px" }}
//                   /> */}
//                 </Box>
//               </Box>
//               <Box textAlign="center">
//                 <Typography
//                   variant="h2"
//                   color={colors.grey[100]}
//                   fontWeight="bold"
//                   sx={{ m: "10px 0 0 0" }}
//                 >
//                   Blackboard
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             {filteredRoles.map((role, index) => (
//               <React.Fragment key={index}>
//                 {role.title && (
//                   <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
//                     {role.title}
//                   </Typography>
//                 )}
//                 {role.items.map((item, itemIndex) => (
//                   <Item
//                     key={itemIndex}
//                     title={item.title}
//                     to={item.to}
//                     icon={getIconComponent(item.icon)}
//                     selected={selected}
//                     setSelected={setSelected}
//                   />
//                 ))}
//               </React.Fragment>
//             ))}
//           </Box>
//         </Menu>
//       </ProSidebar>
//     </Box>
//   );
// };

// export default Sidebar;


// import React from "react";
// import { useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import Avatar from "@mui/material/Avatar";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import TimelapseIcon from '@mui/icons-material/Timelapse';
// import GroupIcon from '@mui/icons-material/Group';
// import sidebar_mapping from "../../sidebar_mapping.json";

// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <MenuItem
//       active={selected === title}
//       style={{
//         color: colors.grey[100],
//       }}
//       onClick={() => setSelected(title)}
//       icon={icon}
//     >
//       <Typography>{title}</Typography>
//       <Link to={to} />
//     </MenuItem>
//   );
// };

// const Sidebar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);  
//   const [selected, setSelected] = useState("Dashboard");

//   return (
//     <Box
//       sx={{
//         "& .pro-sidebar-inner": {
//           background: `${colors.primary[400]} !important`,
//         },
//         "& .pro-icon-wrapper": {
//           backgroundColor: "transparent !important",
//         },
//         "& .pro-inner-item": {
//           padding: "5px 35px 5px 20px !important",
//         },
//         "& .pro-inner-item:hover": {
//           color: "#868dfb !important",
//         },
//         "& .pro-menu-item.active": {
//           color: "#6870fa !important",
//         },
//       }}
//     >
//       <ProSidebar collapsed={isCollapsed}>
//         <Menu iconShape="square">
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//             style={{
//               margin: "10px 0 20px 0",
//               color: colors.grey[100],
//             }}
//           >
//             {!isCollapsed && (
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 ml="15px"
//               >
//                 <Typography variant="h3" color={colors.grey[100]}></Typography>
//                 <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlinedIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>

//           {!isCollapsed && (
//             <Box mb="25px">
//               <Box mb="25px">
//                 <Box display="flex" justifyContent="center" alignItems="center">
//                   {/* <Avatar
//                     alt="Profile-std"
//                     src="school.jpg"
//                     sx={{ width: "100px", height: "100px" }}
//                   /> */}
//                 </Box>
//               </Box>
//               <Box textAlign="center">
//                 <Typography
//                   variant="h2"
//                   color={colors.grey[100]}
//                   fontWeight="bold"
//                   sx={{ m: "10px 0 0 0" }}
//                 >
//                   Blackboard
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//             {sidebar_mapping.map((role, index) => (
//               <React.Fragment key={index}>
//                 {role.title && (   // title =>Get profile and attendance ("Typography") from the json file.
//                   <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
//                     {role.title}
//                   </Typography>
//                 )}
//                 {role.items.map((item, itemIndex) => (
//                   <Item
//                     key={itemIndex}
//                     title={item.title}
//                     to={item.to}
//                     icon={getIconComponent(item.icon)}
//                     selected={selected}
//                     setSelected={setSelected}
//                   />
//                 ))}
//               </React.Fragment>
//             ))}
//           </Box>
//         </Menu>
//       </ProSidebar>
//     </Box>
//   );
// };
// function getIconComponent(iconName) {
//   switch (iconName) {
//     case "PeopleOutlinedIcon":
//       return <PeopleOutlinedIcon />;
//     case "ContactsOutlinedIcon":
//       return <ContactsOutlinedIcon />;
//     case "GroupIcon":
//       return <GroupIcon />;
//     case "PersonOutlinedIcon":
//       return <PersonOutlinedIcon />;
//     case "TimelapseIcon":
//       return <TimelapseIcon />;
//     case "CalendarMonthIcon":
//       return <CalendarMonthIcon />;
//     case "AdminPanelSettingsIcon":
//       return <AdminPanelSettingsIcon />;
//     case "ReceiptOutlinedIcon":
//       return <ReceiptOutlinedIcon />;
//     case " DashboardIcon":
//       return <DashboardIcon />;
//     default:
//       return null;
//   }
// }
// export default Sidebar;


{/* <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {userSpecificData.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Typography variant="h6" color={colors.grey[100]}>
                  {section.title}
                </Typography>
                <Menu iconShape="square">
                  {section.items.map((item, itemIndex) => (
                    <MenuItem
                      key={itemIndex}
                      active={selected === item.title}
                      onChange={() => setSelected(item.title)}
                      icon={getIconComponent(item.icon)}
                    >
                      <Typography>{item.title}</Typography>
                      <Link to={item.to} />
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
          </Box> */}
//<--------------------------]
// <Box paddingLeft={isCollapsed ? undefined : "10%"}>
//   {userSpecificData.map((section, index) => (
//     <React.Fragment key={index}>
//       {section.title}
//     </React.Fragment>
//   ))}
// </Box>