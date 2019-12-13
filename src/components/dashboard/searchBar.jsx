/********************************************************************************
 *  @Purpose        : to design searchBar fro dashboard
 *  @file           :  searchBar.jsx    
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 12-12-2019
 *********************************************************************************/
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import Tools from '../components/tools.jsx';
export default class SearchedNotes extends Component {
    render() {
        let cardsView = this.props.noteProps ? "cards" : "listCards";
        return (
                <div>
                    {(this.props.searchNote).length === 0 ?
                        <div>
                            <div style={{ fontFamily: "georgia", color: "grey", fontSize: "25px", width: "inherit",marginLeft:"50px" }}>
                            No matching results.
                        </div>
                        </div>
                        :
                        <label style={{ fontFamily: "cursive", fontSize: "18px", color: "grey", marginRight: "760px" }}>SearchedNotes</label>
                    }
                    <div className="CardsView" >
                        {this.props.searchNote.map((key) => {
                            return (
                                <Card className={cardsView} style={{ borderRadius: "15px", border: "1px solid #dadce0" }} >
                                    <div id="displaycontentdiv">
                                        <Tools
                                            noteID={key._id}
                                            reminder={this.props.reminderNote}
                                            trashNote={this.props.trashNote}
                                            archiveNote={this.props.archiveNote}
                                            archiveStatus={key.archive}
                                            uploadImage={this.props.uploadImage}
                                            deleteLabelFromNote={this.props.deleteLabelFromNote}
                                            addLabelToNote={this.props.addLabelToNote}
                                        />
                                    </div>
                                </Card>
                            )
                        })
                        }
                    </div>
                </div>
        )
    }
}