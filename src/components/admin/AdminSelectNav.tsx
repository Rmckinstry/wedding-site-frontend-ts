import { FormControl, NativeSelect } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ADMIN_TABS = ["Groups", "Guests", "RSVPs", "After Party"];

function AdminSelectNav({
  tabValue = 0,
  handleChange,
}: {
  tabValue: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div
      id="admin-mobile-nav-container"
      className="flex-row"
      style={{
        borderBottomStyle: "solid",
        borderColor: "#64644015",
        borderWidth: "3px",
        marginBottom: "1rem",
      }}
    >
      <FormControl fullWidth>
        <NativeSelect
          value={tabValue}
          onChange={handleChange}
          className="admin-nav"
          sx={{
            color: "var(--secondary-text) !important",
            fontSize: "2rem",
            fontFamily: "var(--font-main)",
            fontWeight: 600,
          }}
          inputProps={{
            sx: {
              color: "var(--secondary-text) !important",
            },
          }}

          IconComponent={() => <ArrowDropDownIcon sx={{ fontSize: 32 }} />}
        >
          {ADMIN_TABS.map((label, index) => (
            <option key={index} value={index}>
              {label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default AdminSelectNav;
