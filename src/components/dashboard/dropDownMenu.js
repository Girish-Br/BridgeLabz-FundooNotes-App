/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.js      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 4-12-2019
 *****************************************************************************************/
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import SettingsIcon from '@material-ui/icons/Settings';
export default class LongMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
        this.onSignOutClick = this.onSignOutClick.bind(this)
    }
    handleClick = (e) => {
        this.setState({ "anchorEl": e.currentTarget });
    };
    handleClose = () => {
        this.setState({ "anchorEl": null });
    };
    onSignOutClick=()=>{
        this.props.history.push("/login");
      };
    options = [
        'Profile',
        'Settings',
        'Signout'
    ]
    ITEM_HEIGHT = 50;
    render() {
        return (
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    class="dropdown"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: this.ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    <MenuItem onClick={this.onSignOutClick}>Signout</MenuItem>
                </Menu>
            </div>
        );
    }
}