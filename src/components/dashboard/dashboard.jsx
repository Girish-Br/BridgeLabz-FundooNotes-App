/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 3-12-2019
 *****************************************************************************************/
import React from 'react'
import { withRouter } from "react-router-dom";
import Appbar from './appBar.jsx'
import CreateNote from './createNote';
import DisplayNote from './displayItems.jsx'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogBox: false,
      displayList:false,
      archiveCards:false,
   }
    this.dsiplayNote = React.createRef();
  }
  handleArchive=()=>{
    this.setState({archiveCards:!(this.state.archiveCards)})
}
handleTheNotes=()=>{
  this.setState({archiveCards:false})
}
  handleDialogBox() {
    this.setState({ dialogBox: true })
  }
   handleTitleClick(evt) {
   this.setState({ title: evt.target.value })
  }
   handleDescClick(evt) {
    this.setState({ description: evt.target.value })
  }
  displayListView=()=>{
    this.setState({displayList: !this.state.displayList})
  }
  render() {
    let listStyle=!this.state.displayList ? ({display:"flex",width:"100%"}) : ({display:"block",width:"60%"}) 
      return (
      !this.state.archiveCards ?
      <div className="dashboardMainDiv">
        <Appbar view={this.state.displayList} displayList={this.displayListView} handleArchive={this.handleArchive}  handleNotes={this.handleTheNotes}/>
        <div className="content">
        <div>
        <CreateNote />
        </div>
        <div>
        <DisplayNote archiveCards={this.state.archiveCards} style={{display:listStyle.display,width:listStyle.width}}/>
       </div>
        </div>
        </div>
    :  <div className="dashboardMainDiv">
    <Appbar view={this.state.displayList} displayList={this.displayListView} handleArchive={this.handleArchive} handleNotes={this.handleTheNotes}/>
    <div className="content">
    <DisplayNote archiveCards={this.state.archiveCards}style={{display:listStyle.display,width:listStyle.width}}/>
    </div>
    </div>
    )
  }
}
export default withRouter(Dashboard);
