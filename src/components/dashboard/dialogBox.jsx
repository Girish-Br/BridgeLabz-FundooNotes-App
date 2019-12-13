/********************************************************************************
 *  @Purpose        : to design dialog box fro dashboard
 *  @file           :  dialogBox.jsx    
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 13-12-2019
 *********************************************************************************/
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { Button,InputBase } from '@material-ui/core';
import {noteUpdate} from '../../controller/userController'
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
                        <Button onClick={this.updateNote}>Update</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}
export default DailogBox;