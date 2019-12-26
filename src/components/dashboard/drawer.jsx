/********************************************************************************
 *  @Purpose        : to design drawer for dashboard
 *  @file           : drawer.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 8-12-2019
 *********************************************************************************/
import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
class DrawerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: true, archive: false, reminder: false };
  }
  handleArchive = () => {
    this.props.handleTheArchive();
    this.setState({ archive: true, reminder: false, notes: false });
  };
  handleNotes = () => {
    this.props.handleTheNotes();
    this.setState({ archive: false, reminder: false, notes: true });
  };
  handleReminder = () => {
    this.props.handleTheReminder();
    this.setState({ archive: false, reminder: true, notes: false });
  };
  render() {
    let noteDisplay = this.state.notes && "#EFC050";
    let reminderDisplay = this.state.reminder && "#EFC050";
    let archiveDisplay = this.state.archive && "#EFC050";
    return (
      <div>
        <Drawer
          variant="persistent"
          overflow="auto"
          open={this.props.open}
          width={250}
        >
          <List>
            <ListItem
              button
              key="Note"
              onClick={this.handleNotes}
              style={{ backgroundColor: noteDisplay }}
            >
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary="Note" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="Reminder"
              onClick={this.handleReminder}
              style={{ backgroundColor: reminderDisplay }}
            >
              <ListItemIcon>
                <AddAlertIcon />
              </ListItemIcon>
              <ListItemText primary="Reminder" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="Archive"
              onClick={this.handleArchive}
              style={{ backgroundColor: archiveDisplay }}
            >
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </ListItem>
            <Divider />
            <ListItem button key="Trash">
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}
export default DrawerNav;
