/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : createNote.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 9-12-2019
 *****************************************************************************************/
import React from "react";
import { CreateNote } from "../../controller/userController";
import {
  Card,
  Snackbar,
  TextField,
  Tooltip,
  CardActions,
  IconButton,
  Button
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import ImageIcon from "@material-ui/icons/Image";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BrushIcon from "@material-ui/icons/Brush";
import AddBoxIcon from "@material-ui/icons/Add";
import PinDropIcon from "@material-ui/icons/PinDrop";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SvgPin from "../../icons/pin.js";
import SvgPinned from "../../icons/pinned.js";
class CreateNoteDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCard: false,
      title: "",
      description: "",
      anchorEl: null,
      color: "",
      anchorEl1: null,
      archive: false,
      snackbarMsg: "",
      snackbarOpen: false,
      pin: false
    };
    this.archiveNoteCreation = this.archiveNoteCreation.bind(this);
  }
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handleRemainderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleCloseRemainder = () => {
    this.setState({ anchorEl: null });
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  cardOpen = () => {
    this.setState({ openCard: true });
  };
  pinTheNote = e => {
    this.setState({ pin: !this.state.pin });
  };
  closeCard = () => {
    this.setState({ openCard: false });
    const notes = {
      title: this.state.title,
      description: this.state.description,
      archive: this.state.archive,
      color: this.state.color,
      pin: this.state.pin
    };
    if (!(notes.title === "" && notes.description === "")) {
      CreateNote(notes).then(res => {
        if (res === "success") {
          this.setState({
            snackbarMsg: "Notes added",
            snackbarOpen: true
          });
        } else {
          this.setState({
            snackbarMsg: res,
            snackbarOpen: true
          });
        }
      });
    }
  };
  archiveNoteCreation = () => {
    try {
      if (this.state.title === "" && this.state.description === "") {
        this.setState({ cardOpen: false });
      } else {
        this.setState({ cardOpen: false, pin: false });
        const archiveData = {
          title: this.state.title,
          description: this.state.description,
          color: this.state.color,
          archive: true,
          pin: this.state.pin
        };
        CreateNote(archiveData).then(res => {
          if (res === true) {
            this.setState({
              snackbarMessage: "Note Archieved",
              snackbarOpen: true,
              title: "",
              description: "",
              color: "",
              archive: false,
              openCard: false
            });
          } else {
            this.setState({
              snackbarMessage: res,
              snackbarOpen: true
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteIcon = e => {
    this.setState({ deleteIcon: e.currentTarget });
  };
  handleCloseDeleteIcon = () => {
    this.setState({ deleteIcon: null });
  };
  closeColorMenu = e => {
    this.setState({ anchorEl1: e.currentTarget });
  };
  colorChange = e => {
    this.setState({
      color: e.currentTarget.style.backgroundColor,
      anchorEl1: null
    });
  };
  render() {
    let svgPin = !this.state.pin ? <SvgPin /> : <SvgPinned />;
    return !this.state.openCard ? (
      <div className="create-note-card">
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
        <div className="paddingInCardsCreateNote">
          <div className="cardTxtFld">
            <TextField
              multiline
              InputProps={{ disableUnderline: true }}
              placeholder="Note.."
              readOnly={true}
              onClick={this.cardOpen}
              className="text-area"
              value=""
            ></TextField>
          </div>
          <div className="iconsInCard">
            <Tooltip title="New List">
              <AddBoxIcon
                aria-label="New List"
                className="create-note-card-icons"
              />
            </Tooltip>
            <Tooltip title="New Note With Image">
              <BrushIcon
                aria-label="Image"
                className="create-note-card-icons"
              />
            </Tooltip>
            <Tooltip title="New Note with Draw">
              <ImageIcon
                aria-label="Image"
                className="create-note-card-icons"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    ) : (
      <div  className="create-note-card">
        <div className="paddingInCards">
          <TextField
            multiline
            InputProps={{ disableUnderline: true }}
            placeholder="Title..."
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          ></TextField>
          <IconButton onClick={this.pinTheNote} className="pinIcon">
            {svgPin}
          </IconButton>
        </div>
        <div className="paddingInCards">
          <TextField
            multiline
            InputProps={{ disableUnderline: true }}
            placeholder="Take a Note"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          ></TextField>
        </div>
        <div classname="onClickCard">
          <CardActions disableSpacing>
            <div className="onClickCardIcons">
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
              <div>
                <Menu
                  id="remainder-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleCloseRemainder}
                >
                  <MenuItem onClick={this.handleCloseRemainder}>
                    Remainder :
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseRemainder}>
                    Later today
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseRemainder}>
                    Tommorrow
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseRemainder}>
                    Next week
                  </MenuItem>
                </Menu>
              </div>
              <IconButton>
                <Tooltip title="Add colaborator">
                  <PersonAddIcon />
                </Tooltip>
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
                <Tooltip title="Add Image">
                  <ImageIcon />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Archieve">
                  <ArchiveIcon onClick={this.archiveNoteCreation} />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="More">
                  <MoreVertIcon />
                </Tooltip>
              </IconButton>
            </div>
            <div className="onClickCardClose">
              <Button onClick={this.closeCard} class="closeButton">
                Close
              </Button>
            </div>
          </CardActions>
        </div>
      </div>
    );
  }
}
export default CreateNoteDashboard;
