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
export default class LongMenu extends React.Component {
    constructor(props){
        super(props)
        this.setState={
            anchorEl:null,
           setAnchorEl :null,
         open: Boolean(this.anchorEl)
        } 
      }
handleClick = event => {
    this.setAnchorEl(event.currentTarget);
  };
 handleClose = () => {
    this.setAnchorEl(null);
  };
 options = [
    'Profile',
    'Settings',
    'Sign out'
   ];
 ITEM_HEIGHT = 10;
 render(){
     console.log("ggggggg")
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={this.anchorEl}
        keepMounted
        open={this.open}
        onClose={this.handleClose}
        PaperProps={{
          style: {
            maxHeight: this.ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {this.options.map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
}