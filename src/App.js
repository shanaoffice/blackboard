import { useState } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/Login"
import LogTable from './components/LogTable.jsx'
import ProtectedRoute from "./components/ProtectedRoute";
import { CheckInOutProvider } from "./CheckInOutContext"
import { UserContext } from './UserContext';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import ProfilePage from "./components/ProfilePage";
import DataGridComponents from "./components/DataGridComponents";
import StudentPage from "./components/StudentPage";
import StaffPage from "./components/StaffPage";
import sidebar_mapping from "./sidebar_mapping.json";
import InternalRoutesRenderer from "./InternalRoutesRenderer";
import SidebarRouteRenderer from "./SidebarRouteRendere";
import get_config from "./get_config.json";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  return (
    <>
      <CheckInOutProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            {isLoggedIn && <CssBaseline />}
            <div className="app">
              {isLoggedIn && <Sidebar />}
              <main className="content">
                {isLoggedIn && <Topbar setIsLoggedIn={setIsLoggedIn} />}
                <InternalRoutesRenderer sidebar_mapping={sidebar_mapping} />
                <SidebarRouteRenderer get_config={get_config} />
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CheckInOutProvider>
    </>
  );
}
export default App;