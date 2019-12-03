import React from 'react'
import jwt_decode from 'jwt-decode'
import { Container, Card, Grid, Button, AppBar, Toolbar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import PinDropIcon from '@material-ui/icons/PinDrop';
import LabelIcon from '@material-ui/icons/Label';
class dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileOpen: false
    }
    this.onSubmit = this.onSubmit.bind(this)
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
  onSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/login`)
  }

  render() {
    return (
      <div className="root">
        <CssBaseline />
        <AppBar position="fixed" className="appBar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className="menuButton"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Fundoonote
          </Typography>
          </Toolbar>
        </AppBar>
        <nav className="drawer" aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.container}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes="drawerPaper"
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <div className="toolbar" />
                <Divider />
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
                <Divider />
              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: "drawerPaper"
              }}
              variant="permanent"
              open>
              <div>
                <div className="toolbar" />
                <Divider />
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
              </div>
            </Drawer>
          </Hidden>
        </nav>
        <main className="content">
          <div className="toolbar" />
          <Typography paragraph>
            <Card className="profileCard">
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
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.onSubmit}
                      >
                        Logout
              </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </Card>
          </Typography>
        </main>
      </div>
    )
  }
}
export default dashboard;
