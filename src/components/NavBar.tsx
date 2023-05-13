import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchAppBar = ({
  setQuery,
  handleOpen,
  executeNewOperationsHandler,
  getPendingOperations,
}: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: " #1dbc79",
          color: "#28324a",
        }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="section"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <h3
              className="title"
              onClick={() => {
                setQuery("");
                window.location.href = "/";
              }}>
              Catalytics Converter
            </h3>
          </Typography>
          <section className="addNewCatHolder">
            <AddCircleIcon onClick={handleOpen} />
          </section>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              type="search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e: any) => setQuery(e.target.value.toLocaleString())}
            />
          </Search>

          <section className="ExcusionHolder">
            {getPendingOperations.data?.getPendingOperation.length > 0 ? (
              <button
                className="excuteBtn"
                onClick={executeNewOperationsHandler}>
                Execute Operations
              </button>
            ) : (
              <p className="excuteTxt">No Pending Operations</p>
            )}
          </section>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
