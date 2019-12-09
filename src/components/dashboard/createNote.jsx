/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : createNote.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 9-12-2019
 *****************************************************************************************/
import React, { Component } from 'react'
import { Card, TextField, Tooltip, CardContent, CardActions, IconButton, Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import BrushIcon from '@material-ui/icons/Brush';
import AddBoxIcon from '@material-ui/icons/Add';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
class CreateNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openCard: false
        }
    }
    createNote = () => {
        this.setState({ "openCard": true })
    }
    render() {
        return (
            this.state.openCard ?
                <div>
                    <Card className="create-note-card">
                        <CardContent>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Take a note ...."
                                readOnly={true}
                                onClick={this.takeNote}
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
                        </CardContent>
                    </Card>
                </div>
                :
                <div>   <Card className="create-note-card1" >
                    <CardContent disableSpacing>
                        <div>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Title..."
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
                            >
                            </TextField>
                        </div>
                        <div>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <AddAlertIcon />
                                </IconButton>
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
                                <Button>Close</Button>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card></div>
        )
    }
}
export default CreateNote
