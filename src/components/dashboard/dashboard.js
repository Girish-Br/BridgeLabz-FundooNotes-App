/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.js      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 3-12-2019
 *****************************************************************************************/
import React from 'react'
import jwt_decode from 'jwt-decode'
import {withRouter } from "react-router-dom";
import { Container, Card, Grid, AppBar, Toolbar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LabelIcon from '@material-ui/icons/Label';
import LongMenu from './dropDownMenu';
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileOpen: false
    }
  }
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      email: decoded.email,
      firstName: decoded.firstname,
      lastName: decoded.lastname
    })
  }
  handleDrawerToggle = () => {
    this.setState({ "mobileOpen": !this.state.mobileOpen });
  };
  list = (
    <List>
      <ListItem button key="Add Notes">
        <ListItemIcon> <AddIcon /></ListItemIcon>
        <ListItemText primary="Add Notes" />
      </ListItem>
      <ListItem button key="Remove">
        <ListItemIcon> <RemoveIcon /></ListItemIcon>
        <ListItemText primary="Remove" />
      </ListItem>
      <ListItem button key="Edit">
        <ListItemIcon> <EditIcon /></ListItemIcon>
        <ListItemText primary="Edit" />
      </ListItem>
      <ListItem button key="Archive">
        <ListItemIcon> <ArchiveIcon /></ListItemIcon>
        <ListItemText primary="Archive" />
      </ListItem>
      <ListItem button key="Pin">
        <ListItemIcon> <PinDropIcon /></ListItemIcon>
        <ListItemText primary="Pin" />
      </ListItem>
      <ListItem button key="Label">
        <ListItemIcon> <LabelIcon /></ListItemIcon>
        <ListItemText primary="Label" />
      </ListItem>
    </List>
  )
  render() {
    return (
      <div className="root">
        <CssBaseline />
        <AppBar position="fixed" className="appBar" >
          <Toolbar>
            <div><LongMenu/></div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className="menuButton"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              Fundoonote
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className="drawer" aria-label="mailbox folders">
          {/* The implementation will be hidden if screen sixe is greater than 600px. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <div className="toolbar" />
                <Divider />
                {this.list}
                <Divider />
              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open>
              <div>
                <div className="toolbar" />
                <Divider />
                {this.list}
              </div>
            </Drawer>
          </Hidden>
        </nav>
        <main className="content">
          <div className="toolbar" />
            <Card class="profileCard">
              <Container component="main" maxWidth="xs">
                <div>
                  <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                  <div>
                    First Name:{this.state.firstName}
                  </div>
                  <div>
                    last Name:{this.state.lastName}
                  </div>
                  <div>
                    Email : {this.state.email}
                  </div>
                  <Grid container>
                    <Grid item>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </Card>
       
        </main>
      </div>
    )
  }
}
export default withRouter(Dashboard);
