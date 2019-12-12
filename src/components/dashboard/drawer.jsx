import React from 'react'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
class DrawerNav extends React.Component {
    render() {
        return (

            <div>
                <Drawer
                    className="drawer"
                    variant="persistent"
                    overflow="auto"
                    open={this.props.drawerOpen}
                    width={250}
                >
                    <List>
                        <ListItem button key="Note">
                            <ListItemIcon><NotesIcon /></ListItemIcon>
                            <ListItemText primary="Note" />
                        </ListItem>
                        <ListItem button key="Reminder">
                            <ListItemIcon><AddAlertIcon /></ListItemIcon>
                            <ListItemText primary="Reminder" />
                        </ListItem>
                        <Divider />
                        <ListItem button key="Archive">
                            <ListItemIcon><ArchiveIcon /></ListItemIcon>
                            <ListItemText primary="Archive" />
                        </ListItem>
                        <Divider />
                        <ListItem button key="Trash">
                            <ListItemIcon><DeleteIcon /></ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }
}
export default DrawerNav;
