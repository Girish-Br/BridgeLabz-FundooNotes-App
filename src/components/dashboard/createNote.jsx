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
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SvgPin from "../../icons/pin.js";
import  {GetNote,GetNoteForNotPinned}  from '../../controller/userController'
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
      reminder:"",
      pin: false
    };
    this.archiveNoteCreation = this.archiveNoteCreation.bind(this);
  }
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handlereminderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClosereminder = () => {
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
      pin: this.state.pin,
      reminder:this.state.reminder
    };
    if (!(notes.title === "" && notes.description === "")) {
      CreateNote(notes).then(res => {
        if (res === "success") {
          this.setState({
            snackbarMsg: "Notes added",
            snackbarOpen: true,
            title: "",
            description: "",
            color: "",
            pin: false
          })
          this.props.handleRef()
        } else {
          this.setState({
            snackbarMsg:res,
            snackbarOpen:true,
            openCard: false,
            title: "",
            description: "",
            anchorEl: null,
            color: "",
            anchorEl1: null,
            archive: false,
            reminder:"",
            pin: false
          });
        }

      });
    }
  };
  archiveNoteCreation = async() => {
    try {
       await this.setState({ archive: true, pin: false });
        this.closeCard();
      }
  catch (error) {
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
  colorChange = (e) => {
    this.setState({
      color: e.currentTarget.style.backgroundColor,
      anchorEl1: null
    });
  }
  handleSetTodayTime=()=>{
    this.handleClosereminder()
    this.setState({reminder:"today,8:00pm"})
}
  handleSetTommoTime=()=>{
    this.handleClosereminder()
    this.setState({reminder:"tommorrow,8:00pm"})
  }
  handleSetNextWeekTime=()=>{
    this.handleClosereminder()
    let days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon"]
    var date = new Date().toDateString();
    date=date.replace(new Date().getDate().toString(),new Date().getDate()+7);
    date=date.replace(days[new Date().getDay()-1],days[new Date().getDay()]);
    var reminder1 = date + ", 8:00 AM";
    this.setState({ reminder: reminder1 })
  }

  handleSetDate=()=>{}
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
      <div  className="create-note-card" style={{ backgroundColor: this.state.color }}>
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
        <div className="paddingInCards1">
          <TextField
            multiline
            InputProps={{ disableUnderline: true }}
            placeholder="Take a Note"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          ></TextField>
        </div>
        <div className="reminderIncards">{this.state.reminder}</div>
        <div classname="onClickCard">
          <CardActions disableSpacing>
            <div className="onClickCardIcons">
              <IconButton
                aria-label="more"
                aria-controls="reminder-menu"
                aria-haspopup="true"
                onClick={this.handlereminderClick}
              >
                <Tooltip title="reminder">
                  <AddAlertIcon />
                </Tooltip>
              </IconButton>
              <div>
                <Menu
                  id="reminder-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClosereminder}
                >
                  <MenuItem onClick={this.handleClosereminder}>
                    reminder :
                  </MenuItem>
                  <MenuItem onClick={this.handleSetTodayTime}>
                  <div>  Later today</div>
                  </MenuItem>
                  <MenuItem onClick={this.handleSetTommoTime}>
                    Tommorrow
                  </MenuItem>
                  <MenuItem onClick={this.handleSetNextWeekTime}>
                    Next week
                  </MenuItem>
                  <MenuItem  aria-label="more"
                aria-controls="datePicker-menu"
                aria-haspopup="true"
                onClick={this.handlereminderClick}>
                    Select Date and Time
                  </MenuItem>
                  <Menu      id="datePicker-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClosereminder}>
                    <MenuItem></MenuItem>
                    </Menu>
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
                      style={{ backgroundColor: "#6B5B95" }}
                      onClick={this.colorChange}
                    />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <RadioButtonUncheckedRoundedIcon
                      style={{ backgroundColor: "#92A8D1" }}
                      onClick={this.colorChange}
                    />
                  </IconButton>
                  <IconButton>
                    <RadioButtonUncheckedRoundedIcon
                      style={{ backgroundColor: "#DDDDDD" }}
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
