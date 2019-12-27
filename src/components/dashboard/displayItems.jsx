import React from "react";
import GetCards from "./getNote.jsx";
import { GetNote } from "../../controller/userController";
class DisplayNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }
  componentDidMount() {
    this.getAllCards();
  }
  getAllCards = () => {
    GetNote().then(res => {
      if (Array.isArray(res)) {
        this.setState({ notes: res });
      }
      console.log(res);
    });
  };
  render() {
    let pinnedNotes = [],
      unpinnedNotes = [],
      archieveNotes = [],
      reminderNotes = [],
      trashedNotes=[];
    this.state.notes.map(item => {
      if (item.data().pin === true && item.data().archive === false && item.data().trash===false) {
        pinnedNotes.push(
          <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
        );
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
          );
        }
        console.log("aaaaaaaaa", pinnedNotes);
      } else if (item.data().pin === false && item.data().archive === false && item.data().trash===false) {
        unpinnedNotes.push(
          <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
        );
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
          );
        }
      } 
      else if(item.data().trash===true) {
        trashedNotes.push(
          <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
        );
      }
      else{
        archieveNotes.push(
          <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
        );
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards data={item} displayNotes={this.getAllCards} trash={this.props.trash}/>
          );
        }
      }
    });
     return !this.props.archiveCards && !this.props.reminderNotes && !this.props.trash ? (
      <div>
        <div>
          <div className>
            <p className="pinned">PINNED:</p>
          </div>
          <div
            style={{
              display: this.props.style.display,
              width: this.props.style.width
            }}
            className="pinnedCards"
          >
            {pinnedNotes}
          </div>
        </div>
        <div>
          <div>
            <p className="others">OTHER NOTES:</p>
          </div>
          <div
            style={{
              display: this.props.style.display,
              width: this.props.style.width
            }}
            className="otherCards"
          >
            {unpinnedNotes}
          </div>
        </div>
      </div>
    ) :
    !this.props.archiveCards && this.props.reminderNotes && !this.props.trash?
    <div
    style={{
      display: this.props.style.display,
      width: this.props.style.width
    }}
    className="pinnedCards"
  >
    {reminderNotes}
  </div>
    : !this.props.trash?(
      <div
        style={{
          display: this.props.style.display,
          width: this.props.style.width
        }}
        className="pinnedCards"
      >
        {archieveNotes}
      </div>
    ):
    this.props.trash && <div style={{
      display: this.props.style.display,
      width: this.props.style.width
    }}
    className="pinnedCards" >{trashedNotes}</div>
  }
}
export default DisplayNote;





