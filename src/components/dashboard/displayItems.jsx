/********************************************************************************
 *  @Purpose        : to design a component that holds all the cards
 *  @file           :  dialogBox.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 13-12-2019
 *********************************************************************************/
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
      let notesCount = res.length;
      console.log("aaaaaaaaaaaaaaaaaaaa" + notesCount);
      if (Array.isArray(res)) {
        this.setState({ notes: res });
      }
      console.log(res);
    });
  };
  render() {
    let pinnedNotes = [],
      unpinnedNotes = [],
      archiveNotes = [],
      reminderNotes = [],
      trashedNotes = [];
    let pinnedCount = 0,
      unpinnedCount = 0,
      archiveCount = 0,
      reminderCount = 0;
    this.state.notes.map(item => {
      if (
        item.data().pin === true &&
        item.data().archive === false &&
        item.data().trash === false
      ) {
        pinnedNotes.push(
          <GetCards
            data={item}
            displayNotes={this.getAllCards}
            trash={this.props.trash}
          />
        );
        pinnedCount++;
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards
              data={item}
              displayNotes={this.getAllCards}
              trash={this.props.trash}
            />
          );
        }
      } else if (
        item.data().pin === false &&
        item.data().archive === false &&
        item.data().trash === false
      ) {
        unpinnedNotes.push(
          <GetCards
            data={item}
            displayNotes={this.getAllCards}
            trash={this.props.trash}
          />
        );
        unpinnedCount++;
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards
              data={item}
              displayNotes={this.getAllCards}
              trash={this.props.trash}
            />
          );
        }
      } else if (item.data().trash === true) {
        trashedNotes.push(
          <GetCards
            data={item}
            displayNotes={this.getAllCards}
            trash={this.props.trash}
          />
        );
      } else {
        archiveNotes.push(
          <GetCards
            data={item}
            displayNotes={this.getAllCards}
            trash={this.props.trash}
          />
        );
        archiveCount++;
        if (item.data().reminder !== "") {
          reminderNotes.push(
            <GetCards
              data={item}
              displayNotes={this.getAllCards}
              trash={this.props.trash}
            />
          );
        }
      }
    });
    return !this.props.archiveCards &&
      !this.props.reminderNotes &&
      !this.props.trash ? (
      <div>
        <div>
          <div className>
            <p className="pinned">PINNED:({pinnedCount})</p>
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
            <p className="others">OTHER NOTES:({unpinnedCount})</p>
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
    ) : !this.props.archiveCards &&
      this.props.reminderNotes &&
      !this.props.trash ? (
      <div
        style={{
          display: this.props.style.display,
          width: this.props.style.width
        }}
        className="pinnedCards"
      >
        {reminderNotes}
      </div>
    ) : !this.props.trash ? (
      <div
        style={{
          display: this.props.style.display,
          width: this.props.style.width
        }}
        className="pinnedCards"
      >
        <p className="others">ARCHIVE:({archiveCount})</p>
        {archiveNotes}
      </div>
    ) : (
      this.props.trash && (
        <div
          style={{
            display: this.props.style.display,
            width: this.props.style.width
          }}
          className="pinnedCards"
        >
          {trashedNotes}
        </div>
      )
    );
  }
}
export default DisplayNote;
