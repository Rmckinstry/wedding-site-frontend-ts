import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ErrorType, Group, Guest, RSVP } from "../../utility/types";
import Loading from "../utility/Loading.tsx";
import Error from "../utility/Error.tsx";
import { useNavigate } from "react-router-dom";
import AdminGroupEditor from "./AdminGroupEditor.tsx";
import AdminGuestEditor from "./AdminGuestEditor.tsx";
import AdminRSVPEditor from "./AdminRSVPEditor.tsx";
import AdminQuickview from "./AdminQuickview.tsx";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import AdminPartyEditor from "./AdminPartyEditor.tsx";
import AdminSelectNav from "./AdminSelectNav.tsx";

const TabPanel = ({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) => (
  <div role="tabpanel" hidden={value !== index} id={`admin-tabpanel-${index}`} aria-labelledby={`admin-tab-${index}`}>
    {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
  </div>
);

function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);

  const a11yProps = (index: number) => ({
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  });

  const handleDesktopChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleMobileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(event.target.value));
  };

  const allGuestsQuery = useQuery<Guest[], ErrorType>({
    queryKey: ["allGuestsAdmin"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/guests`);
      if (!response.ok) {
        const errorData: ErrorType = await response.json();
        throw errorData;
      }
      return await response.json();
    },
  });

  const allRsvpsQuery = useQuery<RSVP[], ErrorType>({
    queryKey: ["allRsvpsAdmin"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps`);
      if (!response.ok) {
        const errorData: ErrorType = await response.json();
        throw errorData;
      }
      return await response.json();
    },
  });

  const allGroupsQuery = useQuery<Group[], ErrorType>({
    queryKey: ["allGroupsAdmin"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`);
      if (!response.ok) {
        const errorData: ErrorType = await response.json();
        throw errorData;
      }
      return await response.json();
    },
  });

  const refreshData = () => {
    allGuestsQuery.refetch();
    allRsvpsQuery.refetch();
    allGroupsQuery.refetch();
  };

  if (allGuestsQuery.isLoading || allRsvpsQuery.isLoading || allGroupsQuery.isLoading) {
    return <Loading loadingText={"Loading Quickview Data..."} />;
  }
  if (allGuestsQuery.isError) return <Error errorInfo={allGuestsQuery.error} />;
  if (allRsvpsQuery.isError) return <Error errorInfo={allRsvpsQuery.error} />;
  if (allGroupsQuery.isError) return <Error errorInfo={allGroupsQuery.error} />;

  return (
    <div id="admin-container" className="flex-col flex-col-lg">
      <h3 className="contain-text-center">Admin Dashboard</h3>
      <AdminQuickview guests={allGuestsQuery.data} rsvps={allRsvpsQuery.data} />

      <Box id="admin-content-container">
        {isMobile ? (
          <AdminSelectNav tabValue={value} handleChange={handleMobileChange} />
        ) : (
          <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1rem" }}>
            <Tabs value={value} onChange={handleDesktopChange} aria-label="admin dashboard tabs">
              <Tab className="Tab-admin" label="Groups" {...a11yProps(0)} />
              <Tab className="Tab-admin" label="Guests" {...a11yProps(1)} />
              <Tab className="Tab-admin" label="RSVPs" {...a11yProps(2)} />
              <Tab className="Tab-admin" label="After Party" {...a11yProps(3)} />
            </Tabs>
          </Box>
        )}

        <TabPanel value={value} index={0}>
          <AdminGroupEditor groupData={allGroupsQuery.data ?? []} handleDataRefresh={refreshData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminGuestEditor
            groupData={allGroupsQuery.data ?? []}
            guestData={allGuestsQuery.data ?? []}
            handleDataRefresh={refreshData}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminRSVPEditor
            guestData={allGuestsQuery.data ?? []}
            rsvpData={allRsvpsQuery.data ?? []}
            handleDataRefresh={refreshData}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdminPartyEditor
            guestData={allGuestsQuery.data ?? []}
            rsvpData={allRsvpsQuery.data ?? []}
            handleDataRefresh={refreshData}
          />
        </TabPanel>
      </Box>

      <div className="btn-container">
        <button className="btn-rsvp btn-alt" onClick={() => navigate("/")}>
          Back to main site
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
