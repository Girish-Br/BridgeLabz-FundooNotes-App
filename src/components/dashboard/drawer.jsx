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
import LabelIcon from '@material-ui/icons/Label';
import NotesIcon from "@material-ui/icons/Notes";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
class DrawerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: true, archive: false, reminder: false,trash:false };
  }
  handleArchive = () => {
    this.props.handleTheArchive();
    this.setState({ archive: true, reminder: false, notes: false,trash:false });
  };
  handleNotes = () => {
    this.props.handleTheNotes();
    this.setState({ archive: false, reminder: false, notes: true ,trash:false});
  };
  handleReminder = () => {
    this.props.handleTheReminder();
    this.setState({ archive: false, reminder: true, notes: false,trash:false });
  };
  handleTrash=()=>{
    this.props.handleTheTrash();
    this.setState({ archive: false, reminder: false, notes: false,trash:true });
  }
  render() {
    let noteDisplay = this.state.notes && "#feefc3";
    let reminderDisplay = this.state.reminder && "#feefc3";
    let archiveDisplay = this.state.archive && "#feefc3";
    let trashDisplay=this.state.trash && "#feefc3";
    let labels = this.props.labelDetails.map(item => {
      return (
          <ListItem button key="Label1">
                  <ListItemIcon><LabelIcon /></ListItemIcon>
                      <ListItemText primary={item.label} />
                  </ListItem>
      )
  })
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
            <Divider/>
<ListItemText primary="Labels" className="labelDrawer"/>
            {labels}
            <Divider/>
            <ListItem button key="Trash" 
             onClick={this.handleTrash}
             style={{ backgroundColor: trashDisplay }}>
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
