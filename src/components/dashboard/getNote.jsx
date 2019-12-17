/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : getNote.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 11-12-2019
 *****************************************************************************************/
import React from "react";
import DailogBox from "./dialogBox.jsx";
import Menu from "@material-ui/core/Menu";
import { Card, IconButton, Snackbar, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { archiveData, notePinned } from "../../controller/userController.js";
import DeleteNote from "../../controller/userController.js";
import ImageIcon from "@material-ui/icons/Image";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SvgPin from "../../icons/pin.js";
import SvgPinned from "../../icons/pinned.js";
class GetCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteOpen: false,
      anchorEl: null,
      deleteIcon: null,
      id: this.props.data.id,
      pinned: this.props.data.data().pinned,
      snackbarMsg: "",
      snackbarOpen: false
    };
    this.NoteOpenForEdit = this.NoteOpenForEdit.bind(this);
  }
  NoteOpenForEdit = () => {
    this.setState({ noteOpen: !this.state.noteOpen });
  };
  handleDeleteIcon = e => {
    this.setState({ deleteIcon: e.currentTarget });
  };
  handleCloseDeleteIcon = () => {
    this.setState({ deleteIcon: null });
  };
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handleDeleteNote = () => {
      this.setState({deleteIcon:null})
    const data = { doc_id: this.state.id };
    DeleteNote(data).then(res => {
      console.log(res);
      if (res) {
        this.setState({
          snackbarMsg: "Note deleted",
          snackbarOpen: false
        });
      } else {
        this.setState({
          snackbarMsg: res,
          snackbarOpen: false
        });
      }
    });
  };
  archiveNote = () => {
    const data = {
      id: this.state.id
    };
    archiveData(data);
  };
  pinTheNote = () => {
    this.setState({ pinned: !this.state.pinned });
    const data = {
      id: this.state.id,
      pinned: this.state.pinned
    };
    notePinned(data);
  };
  render() {
    return (
      <div className="addedNoteCards">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.snackbarClose}
          message={<span id="messege-id">{this.state.snackbarMsg}</span>}
          action={
            <IconButton
              key="close"
              arial-label="close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          }
        />
        <Card
          className="cardshadow"
          style={{ backgroundColor: this.props.data.data().color }}
        >
          <div>
            <div onClick={this.NoteOpenForEdit}>
              <div className="paddingInCards">
                <Typography>{this.props.data.data().title}</Typography>
              </div>
              <div className="paddingInCards">
                <Typography>{this.props.data.data().description}</Typography>
              </div>
            </div>
            <IconButton
              aria-label="more"
              aria-controls="remainder-menu"
              aria-haspopup="true"
              onClick={this.props.handleRemainderClick}
            >
              <AddAlertIcon />
            </IconButton>
            <Menu
              id="remainder-menu"
              anchorEl={this.props.anchorEl}
              open={Boolean(this.props.anchorEl)}
              onClose={this.props.handleCloseRemainder}
            >
              <MenuItem onClick={this.props.handleCloseRemainder}>
                Remainder :
              </MenuItem>
              <MenuItem onClick={this.props.handleCloseRemainder}>
                Later today
              </MenuItem>
              <MenuItem onClick={this.props.handleCloseRemainder}>
                Tommorrow
              </MenuItem>
              <MenuItem onClick={this.props.handleCloseRemainder}>
                Next week
              </MenuItem>
            </Menu>
            <IconButton>
              <PersonAddIcon />
            </IconButton>
            <IconButton>
              <ColorLensIcon />
            </IconButton>
            <IconButton>
              <ImageIcon />
            </IconButton>
            <IconButton>
              <ArchiveIcon />
            </IconButton>
            <IconButton
              aria-label="more"
              aria-controls="delete-menu"
              aria-haspopup="true"
              onClick={this.handleDeleteIcon}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="delete-menu"
              anchorEl={this.state.deleteIcon}
              open={Boolean(this.state.deleteIcon)}
              onClose={this.handleCloseDeleteIcon}
            >
              <MenuItem onClick={this.handleDeleteNote}>Delete</MenuItem>
            </Menu>
          </div>
        </Card>
        <DailogBox
          open={this.state.noteOpen}
          data={this.props.data}
          closeDialog={this.NoteOpenForEdit}
        />
      </div>
    );
  }
}
export default GetCards;
