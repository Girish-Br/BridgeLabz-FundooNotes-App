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
import { noteUpdate } from "../../controller/userController";
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
      remainder:this.props.data.data().remainder
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
  handleRemainderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleCloseRemainder = () => {
    this.setState({ anchorEl: null });
  };
  handleSetTodayTime=()=>{
    this.setState({remainder:"today,8:00pm"})
}
  handleSetTommoTime=()=>{
    this.setState({remainder:"tommorrow,8:00pm"})
  }
  handleSetNextWeekTime=()=>{
    this.setState({remainder:(Date(Date.now()).toString())})
  }
  handleSetDate=()=>{}
  updateNote = () => {
    const noteData = {
      title: this.state.title,
      description: this.state.description,
      id: this.state.id,
      color:this.state.color,
      archive:this.state.archive,
      pin:this.state.pin
    };
    noteUpdate(noteData).then(res => {
      console.log(res);
      this.props.closeDialog();
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
pinTheNote=()=>{
    this.setState({pin:!this.state.pin})
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
          <div className="paddingInCards">
            <InputBase
              value={this.state.description}
              onChange={this.onChange}
              name="description"
            />
          </div>
          <div className="paddingInCards">
                <Typography className="remainderIncards">
                  {this.state.remainder}
                </Typography>
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
                  <MenuItem onClick={this.handleSetTodayTime}>
                  <div>  Later today</div>
                  </MenuItem>
                  <MenuItem onClick={this.handleSetTommoTime}>
                    Tommorrow
                  </MenuItem>
                  <MenuItem onClick={this.handleSetNextWeekTime}>
                    Next week
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseRemainder}>
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
