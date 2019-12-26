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
  Tooltip,
  Popover
} from "@material-ui/core";
import Grid from "../../icons/Grid.js";
import List from "../../icons/List.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
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
      dialogBox: false,
      anchorElSearch:null
    };
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  handleGrid = () => {
    this.props.displayList();
  };
  handleRefresh = () => {
    window.location.reload();
  };
  openMobileSearch=(e)=>{
    this.setState({anchorElSearch:e.currentTarget})
  }
  closeMobileSearch=()=>{
    this.setState({anchorElSearch:null})
  }
  render() {
    let listIcon = !this.props.view ? <List /> : <Grid />;
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
                <img
                  src={require("../../assets/fundoo.png")}
                  className="fundooIcon"
                />
                <div className="fundoonote">
                  <Typography variant="h6">fundooNotes</Typography>
                </div>
              </div>
              <div className="searchIconLap">
              <IconButton
                      aria-controls="search-field"
                      aria-haspopup="true"
                      onClick={this.openMobileSearch}
                    >
                <Tooltip>
                  <SearchIcon/>
                  </Tooltip>
                  </IconButton>
              </div>
              <div className="searchAndIcon">
                <div className="searchbar">
                  <div className="searchIcon">
                    <IconButton>               
                      <Tooltip>
                        <SearchIcon />
                      </Tooltip>
                      </IconButton>
                    <Popover
                      id="search-field"
                      anchorEl={this.state.anchorElSearch}
                      open={Boolean(this.state.anchorElSearch)}
                      onClose={this.closeMobileSearch}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "center"
                      }}
                      transformOrigin={{
                        vertical: "center",
                        horizontal: "center"
                      }}
                    >
                      <IconButton onClick={this.closeMobileSearch}>
                        <ArrowBackIcon />
                      </IconButton>
                      <InputBase
                        value={this.state.searchNote}
                        onChange={this.handleSearchBar}
                        placeholder="Search"
                        id="inputRoot"
                      />
                      <IconButton onClick={this.closeMobileSearch}>
                        <CloseIcon />
                      </IconButton>
                    </Popover>
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
                <div className="iconsDivAppBar">
                  <div className="refreshIcon">
                    <IconButton onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </div>
                  <div className="gridIcon">
                    <IconButton onClick={this.handleGrid}>
                      {listIcon}
                    </IconButton>
                  </div>
                  <div className="settingsIcon">
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="Avatar">
                <LongMenu />
              </div>
            </Toolbar>
            <DrawerNav
              open={this.state.drawerOpen}
              handleTheReminder={this.props.handleReminder}
              handleTheArchive={this.props.handleArchive}
              handleTheNotes={this.props.handleNotes}
            />
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Appbar;

{
  /* <div className="mobile-search">
                                    <IconButton
                                        aria-controls="search-field"
                                        aria-haspopup="true"
                                    onClick={this.mobileSearchOpen}>
                                    <Tooltip title="Search">
                                        <SearchIcon />
                                    </Tooltip>
                                    </IconButton>
                                </div>
                                <Popover
                                    id="search-field"
                                    anchorEl={this.state.SearchAnchorEl}
                                    open={Boolean(this.state.SearchAnchorEl)}
                                    onClose={this.mobileSearchClose}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                      }}
                                      transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center',
                                    }} >
                                    <IconButton onClick={this.mobileSearchClose}>
                                        <ArrowBackIcon/>
                                    </IconButton>
                                    <InputBase
                                            value={this.state.searchNote}
                                            onChange={this.handleSearchBar}
                                            placeholder="Search"
                                        id="inputRoot" />
                                    <IconButton onClick={this.mobileSearchClose}>
                                    <CloseIcon/>
                                    </IconButton>
                                </Popover> */
}
