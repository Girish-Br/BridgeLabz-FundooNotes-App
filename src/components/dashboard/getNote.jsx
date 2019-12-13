/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : getNote.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 11-12-2019
 *****************************************************************************************/
import React from 'react';
import DailogBox from './dialogBox.jsx'
import Menu from '@material-ui/core/Menu';
import { Card, IconButton, Button, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ImageIcon from '@material-ui/icons/Image';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
class GetCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteOpen: false,
            anchorEl:null
        }
        this.NoteOpenForEdit = this.NoteOpenForEdit.bind(this)
    }
    NoteOpenForEdit = () => {
        this.setState({ noteOpen: !this.state.noteOpen })
    }
    render() {
        return (
            <div>
                <Card className="addedNoteCards">
                    <div onClick={this.NoteOpenForEdit}>
                        <div>{this.props.data.data().title}
                        </div>
                        <Typography variant="body2" component="q">
                            {this.props.data.data().description}
                        </Typography>
                        <IconButton
                            aria-label="more"
                            aria-controls="remainder-menu"
                            aria-haspopup="true"
                            onClick={this.handleRemainderClick}>
                            <AddAlertIcon />
                        </IconButton>
                        <div><Menu
                            id="remainder-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleCloseRemainder}>
                            <MenuItem onClick={this.handleCloseRemainder}>Remainder :</MenuItem>
                            <MenuItem onClick={this.handleCloseRemainder}>Later today</MenuItem>
                            <MenuItem onClick={this.handleCloseRemainder}>Tommorrow</MenuItem>
                            <MenuItem onClick={this.handleCloseRemainder}>Next week</MenuItem>
                        </Menu></div>
                        <IconButton>
                            <PersonAddIcon />
                        </IconButton>
                        <IconButton>
                            <ColorLensIcon />
                        </IconButton>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                        <IconButton>
                            <ArchiveIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </Card>
                <DailogBox open={this.state.noteOpen} data={this.props.data} closeDialog={this.NoteOpenForEdit} />
            </div>
        )
    }
}
export default GetCards;
