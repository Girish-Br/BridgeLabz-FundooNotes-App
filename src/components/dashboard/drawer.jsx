/********************************************************************************
 *  @Purpose        : to design drawer for dashboard
 *  @file           : drawer.jsx    
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 8-12-2019
 *********************************************************************************/
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
                    variant="persistent"
                    overflow="auto"
                    open={this.props.open}
                    width={250}
                >
                    <List>
                        <ListItem button key="Note">
                            <ListItemIcon><NotesIcon /></ListItemIcon>
                            <ListItemText primary="Note" />
                        </ListItem>
                        <Divider/>
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
