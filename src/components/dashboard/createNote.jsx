/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : createNote.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 9-12-2019
 *****************************************************************************************/
import React from 'react';
import { TextField, Card, Hidden, Tooltip,CardContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BrushIcon from '@material-ui/icons/Brush';
import ImageIcon from '@material-ui/icons/Image';
class CreateNote extends React.Component {
    constructor(props) {
        super(props)
   }
    render() {
        return (
            <div>

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
            </div>
        )
    }
}
export default CreateNote
