/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : getNote.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 11-12-2019
 *****************************************************************************************/
import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
class GetCards extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
            return (
                <Card className="addedNoteCards">
                    <CardHeader title={this.props.title} />
                    <CardContent>
                        <Typography variant="body2" component="q">
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </Card>
            )
    }
}
export default GetCards;
