/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : createNote.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 9-12-2019
 *****************************************************************************************/
import React from 'react';
import { CreateNote } from '../../controller/userController';
import { Card, Snackbar, TextField, Tooltip, CardContent, CardActions, IconButton, Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BrushIcon from '@material-ui/icons/Brush';
import AddBoxIcon from '@material-ui/icons/Add';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
class CreateNoteDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openCard: false,
            title: '',
            description: '',
            anchorEl: null,
            snackbarMsg: '',
            snackbarOpen: false,
        }
    }
    snackbarClose = () => {
        this.setState({ snackbarOpen: false });
    }
    handleRemainderClick = (e) => {
        this.setState({ "anchorEl": e.currentTarget });
    };
    handleCloseRemainder = () => {
        this.setState({ "anchorEl": null });
    };
    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    cardOpen = () => {
        this.setState({ openCard: true })
    }
    closeCard = () => {
        this.setState({ openCard: false })
        const notes = {
            title: this.state.title,
            description: this.state.description
        }
        if (!(notes.title === '' && notes.description === '')) {
            CreateNote(notes)
                .then(res => {
                    if (res === 'success') {
                        this.setState({
                            snackbarMsg: 'Notes added',
                            snackbarOpen: true
                        })
                    }
                    else {
                        this.setState({
                            snackbarMsg: res,
                            snackbarOpen: true
                        })
                    }
                })
        }

    }
    handleDeleteIcon = (e) => {
        this.setState({ "deleteIcon": e.currentTarget });
    }
    handleCloseDeleteIcon = () => {
        this.setState({ "deleteIcon": null });
    }
    render() {
        return (
            !this.state.openCard ?
                <div>
                    <Card className="create-note-card">
                        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                            open={this.state.snackbarOpen}
                            autoHideDuration={6000}
                            onClose={this.snackbarClose}
                            message={<span id="messege-id">{this.state.snackbarMsg}</span>}
                            action={
                                <IconButton key="close" arial-label="close" color="inherit" onClick={this.snackbarClose}>
                                </IconButton>} />

                        <TextField
                            multiline
                            InputProps={{ disableUnderline: true }}
                            placeholder="Note.."
                            readOnly={true}
                            onClick={this.cardOpen}
                            className="text-area"
                            value=""
                        >
                        </TextField>

                        <Tooltip title="New List">
                            <AddBoxIcon
                                aria-label="New List"
                                className="create-note-card-icons"
                            />
                        </Tooltip>
                        <Tooltip title="New Note With Image">
                            <BrushIcon
                                aria-label="Image"
                                className="create-note-card-icons"
                            />
                        </Tooltip>
                        <Tooltip title="New Note with Draw">
                            <ImageIcon
                                aria-label="Image"
                                className="create-note-card-icons"
                            />
                        </Tooltip>


                    </Card>
                </div>
                :
                <div>  <Card className="create-note-card1" >
                    <CardContent disableSpacing>
                        <div>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Title..."
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            >
                            </TextField>
                            <IconButton>
                                <PinDropIcon />
                            </IconButton>
                        </div>
                        <div>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Take a Note"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}

                            >
                            </TextField>
                        </div>
                        <div>
                            <CardActions disableSpacing>
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
                                <IconButton >
                                    <MoreVertIcon />
                                </IconButton>
                                <Button onClick={this.closeCard} class="closeButton">Close</Button>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card></div>
        )
    }
}
export default CreateNoteDashboard
