/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 3-12-2019
 *****************************************************************************************/
import React from 'react'
import { withRouter } from "react-router-dom";
import GetCards from './getNote.jsx'
import Appbar from './appBar.jsx'
import CreateNote from './createNote';
import  {GetNote}  from '../../controller/userController'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      dialogBox: false
    }
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  componentDidMount() {
    GetNote().then(res => {
      this.setState({ notes: res })
      console.log(res)
    })
  }
  handleDialogBox() {
    this.setState({ dialogBox: true })
  }
  async handleTitleClick(evt) {
    await this.setState({ title: evt.target.value })
  }
  async handleDescClick(evt) {
    await this.setState({ description: evt.target.value })
  }
  render() {
    let notesCard = this.state.notes.map(item => {
      return (
        <GetCards data={item} />
      )
    })
    return (
      <div className="dashboardMainDiv">
        <Appbar />
        <div className="content">
          <CreateNote />
          {notesCard}
        </div>
      </div>
    )
  }
}
export default withRouter(Dashboard);
