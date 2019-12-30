/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dropDownMenu.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 4-12-2019
 *****************************************************************************************/
import React from "react";
import { withRouter } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import PieChart from "react-minimal-pie-chart";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StopIcon from "@material-ui/icons/Stop";
import { logout } from "../../controller/userController";
class LongMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }
  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onSignOutClick = () => {
    logout();
    this.props.history.push("/login");
  };
  options = ["Profile", "Settings", "Signout"];
  ITEM_HEIGHT = 50;
  render() {
    return (
      <div className="profile">
        {/* <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    class="dropdown"
                    onClick={this.handleClick}>
                    <MoreVertIcon />
                </IconButton> */}
        <Avatar
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          G
        </Avatar>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          anchorOrigin={{vertical:'bottom',
        horizontal:'left'}}
        transformOrigin={{vertical:'top',horizontal:'right'}}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        //   PaperProps={{
        //     style: {
        //       maxHeight: this.ITEM_HEIGHT * 4.5,
        //       width: 200
        //     }
        //   }}
        >
            <div>
            <PieChart
              data={[
                {
                  title: "Pinned Notes",
                  value: this.props.pinnedCount,
                  color: "#EC6B56"
                },
                {
                  title: "Other Notes",
                  value: this.props.unpinnedCount,
                  color: "#7FDBFF"
                },
                {
                  title: "Archive Note",
                  value: this.props.archiveCount,
                  color: "#6A2135"
                },
                {
                  title: "Trash Note",
                  value: this.props.trashCount,
                  color: "#FFC154"
                }
              ]}
            />
            </div>
          <div className="piechart-icon">
            <span id="icons">
              <StopIcon style={{ color: "#EC6B56" }} />
              Pinned({this.props.pinnedCount})
            </span>
            <span id="icons">
              <StopIcon style={{ color: "#C13C37" }} />
              Other({this.props.unpinnedCount})
            </span>
            <span id="icons">
              <StopIcon style={{ color: "#6A2135" }} />
              Archive({this.props.archiveCount})
            </span>
            <span id="icons">
              <StopIcon style={{ color: "#FFC154" }} />
              Trash({this.props.trashCount})
            </span>
          </div>
          {/* {/* <div className="signout-button">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={this.onSignOutClick}
            >
              SignOut
            </Button> *
          </div> */}
             <MenuItem onClick={this.onSignOutClick}style={{backgroundColor:"silver"}}>Signout</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default withRouter(LongMenu);
