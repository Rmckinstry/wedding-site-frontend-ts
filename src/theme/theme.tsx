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
          backgroundColor: "var(--accent)",
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
          "&.Tab-admin": {
            fontSize: "1rem",
            color: "var(--secondary-text-transparent)",
          },
          "&.Mui-selected": {
            color: "var(--secondary-text)",
          },
          "&:hover": {
            fontWeight: "600",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--secondary-background)",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          color: "var(--secondary-text)",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--secondary-background)",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--secondary-background)",
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
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "var(--secondary-text)",
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
            borderColor: "var(--secondary-text)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--secondary-text)",
          },
        },
        notchedOutline: {
          borderColor: "var(--secondary-text)",

          "& span": {
            color: "var(--secondary-text)",
          },
        },
        input: {
          color: "var(--secondary-text)",
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
          color: "var(--secondary-text)",
          "&.Mui-active": {
            color: "var(--secondary-text)",
          },
          "&:hover": {
            color: "var(--secondary-text)",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "var(--secondary-text)",
          fontSize: "1.25rem",
          fontFamily: "var(--font-main)",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.75rem",
          },
        }),
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "var(--secondary-text)",
        },
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
          fontFamily: "var(--font-main)",
          fontSize: "16px",
          color: "var(--default-text)",
        },
      },
    },

    MuiMobileStepper: {
      styleOverrides: {
        root: {
          position: "unset",
          backgroundColor: "transparent",
        },
        progress: {
          width: "100%",
          backgroundColor: "var(--secondary-background)",
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: "var(--accent)",
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

    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-main)",
          color: "var(--secondary-text)",
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            cursor: "not-allowed",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-main)",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
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
