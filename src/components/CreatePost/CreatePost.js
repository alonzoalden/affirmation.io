/**
*
* CreatePost
*
*/

import React, { PropTypes } from 'react';
// import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Dialog from 'material-ui/Dialog';
// import { Link } from 'react-router';
import validator from 'validator';
import axios from 'axios';
import {connectProfile} from '../../auth';
import Editor from 'react-medium-editor';
import './CreatePost.css';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/flat.css';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {Card} from 'material-ui/Card';
import ReactTooltip from 'react-tooltip';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class CreatePost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      phase: null,
      title: '',
      message: '',
      anon: false,
      errors: {},
      submitting: false,
      dialogOpen: false,
      open: false,
      checkPhase: '',
      value: 'Phase',
      firstName: '',
      lastName: ''
    };
  }
  static propTypes = {
    ...connectProfile.PropTypes,
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  getUser() {
    axios.get('/api/users/' + this.props.profile.email)
    .then((user) => {
      let name = user.data.user.name.split(' ');
      console.log('User: ', name);
      this.setState({
        firstName: name[0][0],
        lastName: name[1][0]
       })
    })
    .then(() => {
      console.log('state on render:', this.state);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount() {
    this.getUser();
  }

  validateAndSubmit(e) {
    e.preventDefault();
    const that = this;
    let isValid = true;
    let newErrors = {};

    if (validator.isEmpty(that.state.title) || validator.equals(that.state.title, '<p><br></p>')){
      Object.assign(newErrors, {title: "You must add a title."});
      isValid = false;
    }
    if (validator.isEmpty(that.state.message) || validator.equals(that.state.message, '<p><br></p>')) {
      Object.assign(newErrors, {message: "You must add a message."});
      isValid = false;
    }
    if (validator.isEmpty(that.state.checkPhase) || this.state.phase === "Phase") {
      Object.assign(newErrors, {message: "You must add a phase."});
      isValid = false;
    }
    if (!isValid) {
      that.setState({
        errors: newErrors,
        open: true,
        anchorEl: e.currentTarget
      });
      return;
    } else {
      that.setState({errors: {}});
      axios({
        method: 'post',
        data: {
          'title': that.state.title,
          'message': that.state.message,
          'anon': that.state.anon,
          'userEmail': that.props.profile.email
        },
        url: `/api/posts/${that.state.phase}`,
      }).then(() => {
        that.setState({dialogOpen: true});
        setTimeout(() => {that.context.router.push(`/${that.state.phase}`);}, 2500);
      });
    }
  }

  titleChangeHandler(text, medium) {
    this.setState({title: text});
  }

  messageChangeHandler(text, medium) {
    this.setState({message: text});
    console.log(validator.equals(this.state.message, '<p><br></p>'));
    console.log(this.state.message);
  }

  phaseChangeHandler(e, index, value) {
    this.setState({
      phase: value,
      value: value,
      checkPhase: value
    });
  }

  toggleChangeHandler() {
    this.setState({anon: !this.state.anon});
  }

  dialogCloseHandler() {
    this.setState({dialogOpen: false});
  }

  renderTitleTextField() {
    const titleText = {
      fontSize: 40,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      border: 'none'
    };
    return (
        <Editor
          data-placeholder='Title'
          className='glowing-border'
          style={titleText}
          text={this.state.title}
          onChange={this.titleChangeHandler.bind(this)}
          options={{toolbar: false, placeholder: { hideOnClick: false}}}
        />
    );
  }

  renderMessageTextField(props) {
    const messageText = {
      fontSize: 22,
      lineHeight: 1.1,
      fontFamily: 'Roboto'
    };
    return (
        <Editor
          data-placeholder='Spread your knowledge...'
          className='glowing-border'
          style={messageText}
          text={this.state.message}
          onChange={this.messageChangeHandler.bind(this)}
          options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'anchor']}, placeholder: { hideOnClick: false}}}
        />
    );
  }

  renderPhaseSelector() {
    const dropDown = {
      margin: 0,
      padding: 0,
      marginRight: 0,
    };
    const darkBlue = {
      color: '#0093FF',
    }
    const purp = {
      color: '#867dcc',
    }
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.phaseChangeHandler.bind(this)} style={dropDown} iconStyle={{fill: 'white'}} labelStyle={{ color: 'white' }} selectedMenuItemStyle={{ color: '#867dcc'}} >
          <MenuItem value='Phase' style={purp} primaryText="Select Phase" />
          <MenuItem value='wanttolearn' style={darkBlue} primaryText="Want to Learn" />
          <MenuItem value='learningtocode' style={darkBlue} primaryText="Learning to Code" />
          <MenuItem value='jobhunt' style={darkBlue} primaryText="On the Job Hunt" />
          <MenuItem value='onthejob' style={darkBlue} primaryText="On the Job" />
        </DropDownMenu>
      </div>
    );
  }

  renderAnonToggle(props) {
    const toggle = {
      maxWidth: 50,
      marginLeft: 13,
      marginRight: 0
    };
    return (
      <Toggle
        style={toggle}
        onToggle={this.toggleChangeHandler.bind(this)}
        trackStyle={{backgroundColor: '#867dcc'}}
        thumbStyle={{backgroundColor: '#867dcc'}}
        trackSwitchedStyle={{backgroundColor: '#0093FF'}}
        thumbSwitchedStyle={{backgroundColor: '#0093FF'}}
      />
    );
  }

  renderSubmitButton() {
    return (
        <RaisedButton
          type="submit"
          label="Submit Affirmation"
          labelPosition="before"
          primary={true}
          icon={<AddCircleOutline />}
          disabled={this.state.submitting} //Edit this
        />
    );
  }

  renderSuccessDialog() {
    return (
        <Dialog
          title="Thanks!"
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.dialogCloseHandler.bind(this)}
          >
          Thanks for sharing your knowledge with the community!
        </Dialog>
    );
  }
  renderPopOver(){
    const that = this;
    const pop = {
      height: 75,
      width: 150,
      padding: 15,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto',
      color: '#0093FF'
    };
    return (
      <div>
         <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onRequestClose={this.handleRequestClose}
          >
          {(validator.isEmpty(that.state.title) || validator.equals(that.state.title, '<p><br></p>')) ? <div style={pop}>Your affirmation needs a title!</div> : null}
          {(validator.isEmpty(that.state.message) || validator.equals(that.state.message, '<p><br></p>')) ? <div style={pop}>Your affirmation needs some content!</div> : null}
          {(this.state.phase === "Phase" || this.state.phase === null) ? <div style={pop}>Your affirmation needs a phase!</div> : null}
        </Popover>
      </div>
    )
  }

  renderPhasePopOver(){
    const pop = {
      height: 50,
      width: 50,
      padding: 15,
      color: 'red'
    };
    return (
      <div>
         <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
        </Popover>
      </div>
    )
  }

  renderToolBar(){
    const toolBarText = {
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    };
    const button = {
      backgroundColor: '#0093FF',
      color: 'white',
      marginLeft: 0,
      marginRight: 0
    };
    const toolbar = {
      marginTop: 20,
      backgroundColor: '#0093FF'
    };
    const chip = {
      paddingLeft: 15,
      paddingRight: 15
    };

          // <div style={toolBarText}>Submit Affirmation</div>
    return (
      <div>
        <Toolbar style={toolbar}>
          <ToolbarGroup >
        <Chip
          backgroundColor={'#0093FF'}
          labelColor={'#fff'}
          labelStyle={chip}
        >
          <Avatar size={32} color={'#FFFFFF'} backgroundColor={'#867dcc'}>
            {this.state.firstName + this.state.lastName}
          </Avatar>
          CREATE AN AFFIRMATION
        </Chip>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <i className="material-icons" style={{ color: 'white' }}data-tip="Submit Anonymously">visibility_off</i>
            {this.renderAnonToggle()}
            {this.renderPhaseSelector()}
            <FlatButton onClick={this.validateAndSubmit.bind(this)} style={button} label="Submit" />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }

  render() {
    const paperStyle = {
      minHeight: 550,
      width: 750,
      padding: 30,
      backgroundColor: 'white'
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const tooltip = {
      fontFamily: 'Roboto'
    };
    return (
      <div>
        <div style={center}>
          <div>
            <div>
              {this.renderToolBar()}
              <Card style={paperStyle}>
                <div className='title'>
                  {this.renderTitleTextField()}
                </div><br />
                <div>
                  {this.renderMessageTextField()}
                </div>
                  {this.renderPopOver()}
                <div style={center}>
                  {this.renderSuccessDialog()}
                </div>
                <ReactTooltip
                  place='bottom'
                  style={tooltip}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connectProfile(CreatePost)
