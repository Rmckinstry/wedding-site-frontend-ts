import React from "react";
import DesktopTabBar from "./DesktopTabBar.tsx";
import MobileSelectNav from "./MobileSelectNav.tsx";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigation } from "../../context/NavigationContext.tsx";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { tabValue, handleTabChange } = useNavigation();
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleNavTabChange = (event: React.SyntheticEvent | Event, newValue?: number) => {
    let selectedTab: number;
    if (newValue === undefined) {
      selectedTab = Number((event.target as HTMLSelectElement).value);
    } else {
      selectedTab = newValue;
    }

    // If Admin tab is selected, navigate to /admin instead of setting tabValue
    if (selectedTab === 5) {
      navigate("/admin");
    } else {
      handleTabChange(event, newValue);
    }
  };

  return (
    <div id="tab-bar-container">
      {isMobile ? (
        <div id="nav-mobile-container">
          <MobileSelectNav tabValue={tabValue} handleChange={handleNavTabChange} isAdmin={isAdmin} />
        </div>
      ) : (
        <div id="nav-desktop-container">
          <DesktopTabBar tabValue={tabValue} handleChange={handleNavTabChange} isAdmin={isAdmin} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
