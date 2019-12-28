/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : createNote.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 9-12-2019
 *****************************************************************************************/
import React from "react";
import { CreateNote, createLabel } from "../../controller/userController";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from "@material-ui/core/Chip";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
  Tooltip,
  CardActions,
  IconButton,
  Button,
  Grid,
  BottomNavigation,
  InputBase,
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArchiveIcon from "@material-ui/icons/Archive";
import { ReminderUpdate } from "../../controller/userController.js";
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
      openReminderMenu: false,
      archive: false,
      snackbarMsg: "",
      snackbarOpen: false,
      reminder: "",
      date: "",
      time: "",
      pin: false,
      anchorElMore: null,
      labelClick: false,
      labelValue: "",
      trash: false,
      labels: []
    };
    this.archiveNoteCreation = this.archiveNoteCreation.bind(this);
  }

  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handlereminderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  setDateOpen = e => {
    this.setState({ openReminderMenu: !this.state.openReminderMenu });
  };
  handleClosereminder = () => {
    this.setState({ anchorEl: null });
  };
  handleReminderDelete = () => {
    this.setState({ reminder: "" });
  };
  onChange = e => {
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
      reminder: this.state.reminder,
      trash: this.state.trash
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
            pin: false,
            reminder: ""
          });
          this.props.handleRef();
        } else {
          this.setState({
            snackbarMsg: res,
            snackbarOpen: true,
            openCard: false,
            title: "",
            description: "",
            anchorEl: null,
            color: "",
            anchorEl1: null,
            archive: false,
            reminder: "",
            pin: false,
            date: "",
            time: ""
          });
        }
      });
    }
  };
  archiveNoteCreation = async () => {
    try {
      await this.setState({ archive: true, pin: false });
      this.closeCard();
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
  handleSetTodayTime = () => {
    this.handleClosereminder();
    console.log(new Date());
    var date = new Date().toDateString();
    console.log(new Date().toDateString());
    let reminder1 = date + ", 8:am";
    this.setState({ reminder: reminder1 });
  };
  handleSetTommoTime = () => {
    this.handleClosereminder();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var nextweek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7);
    console.log('next week',nextweek)
    let date = nextweek.toDateString();
    console.log(new Date().getDay());
    let reminder1 = date + ", 8:am";
    this.setState({ reminder: reminder1 });
  };

  handleSetNextWeekTime = () => {
    this.handleClosereminder();
    var date = new Date().toDateString();
    console.log(new Date());
    date = date.replace(
      new Date().getDate().toString(),
      new Date().getDate() + 7
    );
    var reminder1 = date + ", 8:00 AM";
    this.setState({ reminder: reminder1 });
  };
  handleDate = (v, e) => {
    let date1 = v.toString().slice(3, 15);
    this.setState({ date: date1 });
    console.log(this.state.date);
  };
  handleTime = (v, e) => {
    let time1 = v;
    console.log(time1);
    this.setState({ time: time1 });
    console.log(this.state.time);
  };
  handleSave = () => {
    this.handleClosereminder();
    let time1 = this.state.time;
    let time = time1.toString().slice(15, 24);
    console.log(time);
    this.setState({ reminder: this.state.date + "," + time });
    this.setState({ openReminderMenu: !this.state.openReminderMenu });
    this.props.handleRef();
  };
  handleMoreMenu = e => {
    this.setState({ anchorElMore: e.currentTarget });
  };
  handleCloseMoreMenu = () => {
    this.setState({ anchorElMore: null });
    this.setState({ labelClick: !this.state.labelClick });
  };
  handleLabelClick = () => {
    this.setState({ labelClick: !this.state.labelClick });
  };
  handleLabelValue = e => {
    this.setState({ labelValue: e.target.value });
  };
  handleCreateLabel = () => {
    this.handleCloseMoreMenu();
    console.log(this.state.labelValue);
    const labelData = { labelData: this.state.labelValue };
    createLabel(labelData).then(res => {
      console.log("result label", res);
      this.setState({ labels: res ,labelValue:''});
    });
  };
  handleCheckBoxClick = e => {
    if (e.target.checked) {
      // console.log('checked',e.target.value)
      // var newStateArray = this.state.labels.slice();
      // newStateArray.push({id:e.target.id,label:e.target.value});
      // console.log('new state array',newStateArray)
      // this.setState({ labels: newStateArray });
      this.setState({
        labels: [
          ...this.state.labelValue,
          { id: e.target.id, label: e.target.value }
        ]
      });
    }
  };
  removeLabel = (e)=> {
    console.log("remove", e.target.id);
    const labels = this.state.labels.filter(item => item.id !== e.target.id);
    this.setState({ labels: labels });
  };
  render() {
    let labels = "";
    if (this.state.labels.length > 0) {
      labels = this.state.labels.map(item => {
        return (
          <Chip
            label={item.label}
            id={item.id}
            onDelete={event => this.removeLabel(event)}
            deleteIcon={<CancelIcon id={item.id} />}
            variant="outlined"
          />
        );
      });
    }
    let label = "";
    if (this.props.label.length > 0) {
      label = this.props.label.map(item => {
        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  id={item.id}
                  name={item.label}
                  value={item.label}
                  onChange={event => this.handleCheckBoxClick(event)}
                />
              }
              label={item.label}
              labelPlacement="end"
            />
          </div>
        );
      });
    }
    let labelMenu = !this.state.labelClick ? (
      <Menu
        id="more-menu"
        anchorEl={this.state.anchorElMore}
        keepMounted
        open={Boolean(this.state.anchorElMore)}
        onClose={this.handleCloseMoreMenu}
      >
        <MenuItem onClick={this.handleLabelClick}>Add Label</MenuItem>
        <MenuItem>Add Drawing</MenuItem>
        <MenuItem>Show Tick Boxes</MenuItem>
      </Menu>
    ) : (
      <Menu
        id="more-menu"
        anchorEl={this.state.anchorElMore}
        keepMounted
        open={Boolean(this.state.anchorElMore)}
        onClose={this.handleCloseMoreMenu}
      >
        <MenuItem>Label Note</MenuItem>
        <MenuItem>
          <InputBase
            value={this.state.labelValue}
            onChange={this.handleLabelValue}
            placeholder="Enter Label Name"
            id="inputRoot"
          />
        </MenuItem>

        <div className="currentLabels">{label}</div>
        <Divider />
        <MenuItem onClick={this.handleCreateLabel}>
          <div className="labelNotes">
            <Tooltip title="create label">
              <AddIcon className="addIconLabel" />
            </Tooltip>
            <p className="CreateLabelP">Create </p>
            <p>
              <b> ` {this.state.labelValue} ` </b>
            </p>
          </div>
        </MenuItem>
      </Menu>
    );
    let reminderMenuItem = !this.state.openReminderMenu ? (
      <div>
        <Menu
          id="reminder-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClosereminder}
        >
          <MenuItem onClick={this.handleClosereminder}>Reminder :</MenuItem>
          <MenuItem onClick={this.handleSetTodayTime}>Later today</MenuItem>
          <MenuItem onClick={this.handleSetTommoTime}>Tommorrow</MenuItem>
          <MenuItem onClick={this.handleSetNextWeekTime}>Next week</MenuItem>
          <MenuItem onClick={this.setDateOpen}>Select Date and Time</MenuItem>
        </Menu>
      </div>
    ) : (
      <div>
        <Menu
          id="reminder-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClosereminder}
        >
          <div className="dateAndReminder">
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="date"
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  value={this.state.date}
                  onChange={(value, event) => this.handleDate(value, event)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  name="time"
                  margin="normal"
                  id="time-picker"
                  value={this.state.time}
                  onChange={(value, event) => this.handleTime(value, event)}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className="saveInReminder">
            <Button
              onClick={this.handleSave}
              style={{ backgroundColor: "silver" }}
            >
              Save
            </Button>
          </div>
        </Menu>
      </div>
    );
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
      <div
        className="create-note-card"
        style={{ backgroundColor: this.state.color }}
      >
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
        {this.state.reminder !== "" ? (
          <div className="reminderIncards">
            <Chip
              icon={<EventIcon />}
              label={this.state.reminder}
              onDelete={this.handleReminderDelete}
              variant="outlined"
            />
          </div>
        ) : (
          <div />
        )}
        <p className="labelsInCreateCard">{labels !== "" && labels}</p>
        {/* {this.state.labelValue !== "" ? (
          <div className="reminderIncards">
            <Chip
              icon={<EventIcon />}
              label={this.state.labelValue}
              onDelete={this.handlelabelDelete}
              variant="outlined"
            />
          </div>
        ) : (
          <div className="reminderIncards" />
        )} */}
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
              {reminderMenuItem}
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
              <IconButton
                aria-label="more"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={this.handleMoreMenu}
              >
                <Tooltip title="More">
                  <MoreVertIcon />
                </Tooltip>
              </IconButton>
              {labelMenu}
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
