import React from "react";
import GetCards from "./getNote.jsx";
import Appbar from "./appBar.jsx";
import { withRouter } from "react-router-dom";
import CreateNote from "./createNote";
import {
  GetNote,
} from "../../controller/userController";
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
      archieveNotes = [];
    this.state.notes.map(item => {
      if (item.data().pin === true && item.data().archive === false) {
        pinnedNotes.push(<GetCards data={item}
          displayNotes={this.getAllCards}/>);
          console.log("aaaaaaaaa",pinnedNotes)
      } else if (
        item.data().pin === false &&
        item.data().archive === false
      ) {
        unpinnedNotes.push(<GetCards data={item}
          displayNotes={this.getAllCards}/>);
      } else {
        archieveNotes.push(<GetCards data={item}
          displayNotes={this.getAllCards}/>);
      }
    });

    return !this.props.archiveCards ? (
        <div>
        <div>
            <div className>
              <p className="pinned">PINNED:</p>
            </div>
            <div
              style={{ display: this.props.style.display, width: this.props.style.width }}
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
              style={{ display: this.props.style.display, width: this.props.style.width }}
              className="otherCards"
            >
              {unpinnedNotes}
            </div>
          </div>
</div>
    ) : (
      <div>
        <div>
          <div
            style={{ display: this.props.style.display, width: this.props.style.width }}
            className="pinnedCards"
          ></div>
          {archieveNotes}
        </div>
      </div>
    );
  }
}
export default DisplayNote;
