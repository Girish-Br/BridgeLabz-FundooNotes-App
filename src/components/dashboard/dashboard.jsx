/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 3-12-2019
 *****************************************************************************************/
import React from 'react'
import { withRouter } from "react-router-dom";
import GetCards from './getNote.jsx'
import { AppBar, Toolbar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LabelIcon from '@material-ui/icons/Label';
import LongMenu from './dropDownMenu';
import CreateNote from './createNote';
import { GetNote } from '../../controller/userController.js'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      notes: []
    }
  }
  componentDidMount() {
    GetNote().then(res => {
      this.setState({ notes: res })
      console.log(res)
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
    let notesCard = this.state.notes.map(item => {
      return (
        <GetCards title={item.title} description={item.description}/>
      )
    })
    return (
      <div className="dashboardMainDiv">
        <CssBaseline />
        <div>
          <AppBar>
            <Toolbar>
              <LongMenu />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className="fundoonote">
                Fundoonote
          </Typography>

            </Toolbar>
          </AppBar>
        </div>
        <div className="drawer">
          <nav aria-label="mailbox folders">
            <Drawer
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Divider />
              {this.list}
              <Divider />
            </Drawer>
          </nav>
        </div>
        <div className="content">
          <main >
            <CreateNote />
          </main>
          {notesCard}
        </div>
      </div>
    )
  }
}
export default withRouter(Dashboard);
