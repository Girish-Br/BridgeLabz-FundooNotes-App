/********************************************************************************
 *  @Purpose        : to design dialog box for dashboard
 *  @file           :  dialogBox.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 13-12-2019
 *********************************************************************************/
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  InputBase,
  IconButton,
  CardActions,
  Typography,
  Tooltip
} from "@material-ui/core";
import { noteUpdate,archiveData } from "../../controller/userController";
import SvgPin from "../../icons/pin.js";
import SvgPinned from "../../icons/pinned.js";
import ImageIcon from "@material-ui/icons/Image";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreVertIcon from "@material-ui/icons/MoreVert";
class DailogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.data().title,
      description: this.props.data.data().description,
      id: this.props.data.id,
      archive:this.props.data.data().archive,
      color:this.props.data.data().color,
      pin:this.props.data.data().pin,
      anchorEl:null,
      reminder:this.props.data.data().reminder
    };
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
  handlereminderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClosereminder = () => {
    this.setState({ anchorEl: null });
  };
  handleSetTodayTime=()=>{
    this.updateReminder();
    var date = new Date().toDateString();
    let reminder1 = date + ", 8:am";
    this.setState({ reminder: reminder1 });
}
handleSetTommoTime=()=>{
  this.updateReminder();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var date = new Date().toDateString();
  date = date.replace(new Date().getDate(), new Date().getDate() + 1);
  date = date.replace(
    days[new Date().getDay() - 1],
    days[new Date().getDay()]
  );
  let reminder1 = date + ", 8:am";
  this.setState({ reminder: reminder1 });
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
  updateNote = () => {
    const noteData = {
      title: this.state.title,
      description: this.state.description,
      id: this.state.id,
      color:this.state.color,
      archive:this.state.archive,
      pin:this.state.pin,
      reminder:this.state.reminder
    };
    noteUpdate(noteData).then(res => {
      console.log(res);
      this.props.displayNotes()
      this.props.closeDialog();
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
pinTheNote=()=>{
    this.setState({pin:!this.state.pin})
}
archiveNoteCreation = () => {
  this.props.closeDialog()
  const data = {
    id: this.props.data.id
  }
  archiveData(data).then(res=>{
    console.log(res)
    this.props.displayNotes()
  }
   ) 
  
}
  render() {
    let svgPin = !this.state.pin ? <SvgPin /> : <SvgPinned />;
    return (
      <Dialog open={this.props.open}>
        <card style={{ backgroundColor: this.state.color }}>
          <div className="paddingInCards">
            <InputBase
              value={this.state.title}
              onChange={this.onChange}
              name="title"
            />
            <IconButton onClick={this.pinTheNote} className="pinIcon">
              {svgPin}
            </IconButton>
          </div>
          <div className="paddingInCards1">
            <InputBase
              value={this.state.description}
              onChange={this.onChange}
              name="description"
            />
          </div>
          <div className="reminderIncards">
                <Typography >
                  {this.state.reminder}
                </Typography>
              </div>
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
                  <MenuItem onClick={this.handleClosereminder}>
                    Select Date and Time
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
                <Button onClick={this.updateNote}>Update</Button>
              </div>
            </CardActions>
          </div>
        </card>
      </Dialog>
    );
  }
}
export default DailogBox;
