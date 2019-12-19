import React from 'react'
import GetCards from './getNote.jsx'
import Appbar from './appBar.jsx'
import CreateNote from './createNote';
import  {GetNote,GetNoteForNotPinned,getArchivedNotes}  from '../../controller/userController'
class DisplayNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      pinnedNotes:[],
    }
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  componentDidMount() {
this.getAllCards()
  }
  getAllCards=()=>{
    GetNoteForNotPinned().then(res => {
      this.setState({ pinnedNotes: res })
      console.log(res)
    })
    GetNote().then(res => {
      this.setState({ notes: res })
      console.log(res)
    })
    getArchivedNotes().then(res=>{
      this.setState({archivedData:res})
      console.log(res)
    })
  }
  render() {
    let listStyle=!this.state.displayList?({display:"flex",width:"100%"}) : ({display:"block",width:"60%"}) 
    let notesCardPinned=this.state.pinnedNotes.map(item=>{
      return(<GetCards data={item} displayAllNote={this.getAllCards}/>)
    })
    let notesCard = this.state.notes.map(item => {
      return (
        <GetCards data={item} dsiplayAllNote={this.getAllCards}/>
      )
    })
    let archivedCards = this.state.archivedData.map(item => {
      return (
        <GetCards data={item} />
      )
    })
    let cardsArchived=this.state.archiveCards ? archivedCards:
    <div className="content">
    <div>
    <CreateNote />
    </div>
    <div >
      <div className>
      <p  className="pinned">PINNED:</p>
      </div>
      <div style={{display:listStyle.display,width:listStyle.width}} className="pinnedCards">
      {notesCardPinned}
      </div>
    </div>
    <div >
    <div>
      <p className="others" >OTHER NOTES:</p>
      </div>
      <div style={{display:listStyle.display,width:listStyle.width}} className="otherCards">
    {notesCard}
    </div>
  </div>
  </div>

return (
  <div className="dashboardMainDiv">
    <Appbar view={this.state.displayList} displayList={this.displayListView} handleArchive={this.handleArchive}/>
    {cardsArchived}
  </div>
)
  }
}
export default DisplayNote;
