/********************************************************************************
 *  @Purpose        : to design dialog box fro dashboard
 *  @file           :  dialogBox.jsx    
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 13-12-2019
 *********************************************************************************/
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { Button,InputBase,IconButton } from '@material-ui/core';
import {noteUpdate} from '../../controller/userController'
import ImageIcon from '@material-ui/icons/Image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
class DailogBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.data.data().title,
            description: this.props.data.data().description,
            id:this.props.data.id
        }
    }
updateNote=()=>{
        const noteData={
            title: this.state.title,
            description: this.state.description,
        id:this.state.id
        }
        noteUpdate(noteData).then(res=>{
            console.log(res)
this.props.closeDialog()
        })

    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    render() {
        return (
            <Dialog open={this.props.open}>
                <div>
                    <div>
                        <InputBase
                            value={this.state.title}
                            onChange={this.onChange}
                            name="title"
                        />
                    </div>
                    <div>
                        <InputBase
                            value={this.state.description}
                            onChange={this.onChange}
                            name="description"
                        />
                    </div>
                    <div>
                    <IconButton
                                    aria-label="more"
                                    aria-controls="remainder-menu"
                                    aria-haspopup="true"
                                    onClick={this.handleRemainderClick}>
                                    <AddAlertIcon />
                                </IconButton>
                                <Menu
                                    id="remainder-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleCloseRemainder}>
                                    <MenuItem onClick={this.handleCloseRemainder}>Remainder :</MenuItem>
                                    <MenuItem onClick={this.handleCloseRemainder}>Later today</MenuItem>
                                    <MenuItem onClick={this.handleCloseRemainder}>Tommorrow</MenuItem>
                                    <MenuItem onClick={this.handleCloseRemainder}>Next week</MenuItem>
                                </Menu>
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
                        <Button onClick={this.updateNote}>Update</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}
export default DailogBox;