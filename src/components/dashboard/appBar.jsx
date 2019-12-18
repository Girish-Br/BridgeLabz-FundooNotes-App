/********************************************************************************
 *  @Purpose        : to design appbar for dashboard
 *  @file           : appBar.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 11-12-2019
 *********************************************************************************/
import React from "react";
import DrawerNav from "./drawer.jsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MuiThemeProvider,
  createMuiTheme,
  Tooltip
} from "@material-ui/core";
import Grid from "../../icons/Grid.js";
import List from "../../icons/List.js";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LongMenu from "./dropDownMenu.jsx";
const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 65,
        width: 250,
        background: "white"
      },
      paperAnchorDockedLeft: {
        borderColor: "white"
      }
    },
    MuiAppBar: {
      root: {
        display: "flex",
        flexDirection: "row"
      },
      colorPrimary: {
        color: "3f51b5",
        fontSize: 25,
        fontFamily: "georgia"
      }
    },
    MuiToolbar: {
      regular: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "white"
      },
      root: {
        position: "absolute",
        alignItems: "center",
        border: "1px solid #E0E0E0"
      }
    },
    MuiListItem: {
      root: {
        borderBottomRightRadius: "25px",
        borderTopRightRadius: "25px",
        height: "60px"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      notes: [],
      dialogBox: false
    };
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  handleGrid = () => {
    this.props.displayList();
  };
  render() {
    return (
      <div className="root">
        <MuiThemeProvider theme={theme}>
          <AppBar color="inherit">
            <Toolbar>
              <div className="navFundooSearch">
                <div className="drawerButton">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className="fundoonote">
                  <Typography variant="h6">Fundoonote</Typography>
                </div>
                <div className="searchbar">
                  <div className="searchIconAppBar">
                    <Tooltip>
                      <SearchIcon />
                    </Tooltip>
                  </div>
                  <div className="inputbasediv">
                    <InputBase
                      // id="searchInputBase"
                      value={this.state.searchNote}
                      onChange={this.handleSearchBar}
                      placeholder="Search"
                      id="inputRoot"
                      className="inputBase"
                    ></InputBase>
                  </div>
                </div>
                <div className="refreshIcon">
                  <IconButton>
                    <RefreshIcon />
                  </IconButton>
                </div>
                <div className="gridIcon">
                  <IconButton onClick={this.handleGrid}>
                    <Grid />
                  </IconButton>
                </div>
                <div className="settingsIcon">
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </div>
              </div>
              <div className="Avatar">
                <LongMenu />
              </div>
            </Toolbar>
            <DrawerNav open={this.state.drawerOpen} />
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Appbar;
