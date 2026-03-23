import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#783C1C",
    },
    secondary: {
      main: "#783C1C",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "var(--default-text)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "var(--default-text)",
          fontSize: "1.5rem",
          marginRight: "1rem",
          marginLeft: "1rem",
          fontFamily: "var(--font-main)",
          "&.Mui-selected": {
            color: "var(--default-text)",
          },
          "&:hover": {
            color: "var(--default-text)",
            fontWeight: "600",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--base-background)",
          //todo: find a complementary color for cards that still fits the aesthetic but provides more contrast with the background
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: "var(--default-text)",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--base-background)",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--base-background)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-main)",
          fontWeight: "var(--weight-semibold)",
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        root: {
          color: "var(--default-text)",
          fontSize: "1.25rem",
          fontFamily: "var(--font-main)",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-main)",
          fontWeight: "var(--weight-semibold)",
        },
        label: {
          "&.Mui-active": {
            color: "var(--default-text)",
          },
          "&.Mui-completed": {
            color: "var(--default-text)",
          },
          "&.Mui-disabled": {
            color: "gray",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-main)",
          fontWeight: "var(--weight-semibold)",
          "&.Mui-focused": {
            color: "var(--default-text)",
          },
          "&.Mui-completed": {
            color: "var(--default-text)",
          },
          "&.Mui-disabled": {
            color: "gray",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--default-text)",
          },
        },
        notchedOutline: {
          borderColor: "var(--default-text)",
        },
      },
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "var(--default-text)",
        },
      },
    },

    MuiToggleButton: {
      // Target the ToggleButton component
      styleOverrides: {
        root: {
          // Default state (not selected)
          backgroundColor: "var(--base-background)",
          color: "var(--default-text)",
          borderColor: "var(--default-text)",

          // Selected state
          "&.Mui-selected": {
            backgroundColor: "var(--default-text)",
            color: "var(--base-background)",
            borderColor: "var(--default-text)",
            "&:hover": {
              backgroundColor: "var(--default-text)",
              color: "var(--base-background)",
            },
          },

          "&:hover": {
            backgroundColor: "#EEE",
          },

          "& + &.MuiToggleButton-root": {
            borderColor: "var(--default-text)",
            marginLeft: "-1px",
          },
          "&.Mui-selected + &.MuiToggleButton-root": {
            borderColor: "var(--default-text)",
          },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "var(--default-text)",
          "&.Mui-active": {
            color: "var(--default-text)",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "var(--default-text)",
          fontSize: "1.25rem",
          fontFamily: "var(--font-main)",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.75rem",
          },
        }),
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: "var(--default-text)",
          },
          "&.Mui-completed": {
            color: "var(--default-text)",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "16px",
        },
      },
    },

    MuiMobileStepper: {
      styleOverrides: {
        root: {
          position: "unset",
        },
        progress: {
          width: "100%",
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        // This targets the paper component used for the dropdown
        paper: ({ theme }) => ({
          "& .MuiAutocomplete-listbox": {
            [theme.breakpoints.down("md")]: {
              // Apply for md and sm breakpoints
              fontSize: "1.75rem",
            },
          },
          "& .MuiAutocomplete-option": {
            [theme.breakpoints.down("md")]: {
              // Apply for md and sm breakpoints
              fontSize: "1.75rem",
            },
          },
        }),
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 901,
      lg: 1921,
      xl: 2000,
    },
  },
});

export default theme;
