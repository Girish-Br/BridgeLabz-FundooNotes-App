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
import {
  Card,
  IconButton,
  Snackbar,
  Typography,
  Tooltip
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {
  archiveData,
  notePinned,
  remainderUpdate
} from "../../controller/userController.js";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
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
      color: "",
      anchorEl1: null,
      pinned: this.props.data.data().pinned,
      snackbarMsg: "",
      snackbarOpen: false,
      iconDisplay: false,
      remainder: this.props.data.data().remainder
    };
    this.NoteOpenForEdit = this.NoteOpenForEdit.bind(this);
  }
  closeColorMenu = e => {
    this.setState({ anchorEl1: e.currentTarget });
  };
  colorChange = e => {
    this.setState({
      color: e.currentTarget.style.backgroundColor,
      anchorEl1: null
    });
  };
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
  handleRemainderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleCloseRemainder = () => {
    this.setState({ anchorEl: null });
  };
  handleSetTodayTime = () => {
    this.setState({ remainder: "today,8:00pm" });
    this.updateRemainder();
  };
  handleSetTommoTime = () => {
    this.setState({ remainder: "tommorrow,8:00pm" });
    this.updateRemainder();
  };
  handleSetNextWeekTime = () => {
    this.handleCloseRemainder();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
    var date = new Date().toDateString();
    date = date.replace(
      new Date().getDate().toString(),
      new Date().getDate() + 7
    );
    date = date.replace(
      days[new Date().getDay() - 1],
      days[new Date().getDay()]
    );
    var reminder1 = date + ", 8:00 AM";
    this.setState({ reminder: reminder1 });
  };
  handleSetDate = () => {
    this.updateRemainder();
  };
  updateRemainder = () => {
    let remainderDetails = {
      id: this.props.data.id,
      remainder: this.state.remainder
    };
    remainderUpdate(remainderDetails).then(res => {
      console.log(res);
    });
  };
  handleRemainderDelete = () => {
    this.setState({ remainder: '' });
    this.updateRemainder();
  };
  handleDeleteNote = () => {
    this.setState({ deleteIcon: null });
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
  handleMouseOver = () => {
    this.setState({ iconDisplay: true });
  };
  handleMouseClose = () => {
    this.setState({ iconDisplay: false });
  };
  render() {
    let svgPin = !this.state.pin ? <SvgPin /> : <SvgPinned />;
    let svg = !this.state.iconDisplay ? (
      <IconButton></IconButton>
    ) : (
      <IconButton onClick={this.pinTheNote}>{svgPin}</IconButton>
    );
    let iconsContent = !this.state.iconDisplay ? (
      <div className="cardsHover" />
    ) : (
      <div className="cardsHover">
        <IconButton
          aria-label="more"
          aria-controls="remainder-menu"
          aria-haspopup="true"
          onClick={this.handleRemainderClick}
        >
          <Tooltip title="Remainder">
            <AddAlertIcon />
          </Tooltip>
        </IconButton>
        <Menu
          id="remainder-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleCloseRemainder}
        >
          <MenuItem onClick={this.handleCloseRemainder}>Remainder :</MenuItem>
          <MenuItem onClick={this.handleSetTodayTime}>
            <div> Later today</div>
          </MenuItem>
          <MenuItem onClick={this.handleSetTommoTime}>Tommorrow</MenuItem>
          <MenuItem onClick={this.handleSetNextWeekTime}>Next week</MenuItem>
          <MenuItem onClick={this.handleCloseRemainder}>
            Select Date and Time
          </MenuItem>
        </Menu>
        <IconButton>
          <PersonAddIcon />
        </IconButton>
        <IconButton
          aria-label="more"
          aria-controls="color-menu"
          aria-haspopup="true"
          onClick={this.closeColorMenu}
        >
          <Tooltip title="Add Color">
            <ColorLensIcon />
          </Tooltip>
        </IconButton>
        <Menu
          id="color-menu"
          anchorEl={this.state.anchorEl1}
          keepMounted
          open={Boolean(this.state.anchorEl1)}
          onClose={this.closeColorMenu}
        >
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#f28b82" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#cbf0f8" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#faebd7" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#6B8E23" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#4BB8C0" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#3BDEDE" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
        </Menu>
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
    );
    return (
      <div
        style={{ backgroundColor: this.state.color }}
        className="addedNoteCards"
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseClose}
      >
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
            <div>
              <div className="pinAndTxtFld">
                <div className="paddingInCards" onClick={this.NoteOpenForEdit}>
                  <Typography className="titleinGetCards">
                    <b>{this.props.data.data().title}</b>
                  </Typography>
                </div>
              </div>
              <div className="paddingInCards"  onClick={this.NoteOpenForEdit}>
                <Typography className="descIn">
                  {this.props.data.data().description}
                </Typography>
              </div>
              <div className="remainderIncards">
                <Typography className="remainderIncardstypo">
                  {this.state.remainder}
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleRemainderDelete}
                ></IconButton>
              </div>
            </div>
            {iconsContent}
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
