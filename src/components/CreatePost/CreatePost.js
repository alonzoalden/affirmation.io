/**
*
* CreatePost
*
*/

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
// import { Link } from 'react-router';
import validator from 'validator';
import axios from 'axios';
import {connectProfile} from '../../auth';


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
      dialogOpen: false
    };
  }
  static propTypes = {
    ...connectProfile.PropTypes,
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  validateAndSubmit(e) {
    e.preventDefault();
    const that = this;
    let isValid = true;
    let newErrors = {};

    if (validator.isEmpty(that.state.title)){
      Object.assign(newErrors, {title: "You must add a title."});
      isValid = false;
    }
    if (validator.isEmpty(that.state.message)) {
      Object.assign(newErrors, {message: "You must add a message."});
      isValid = false;
    }
    if (!isValid) {
      that.setState({errors: newErrors});
      return;
    } else {
      that.setState({errors: {}});
      axios({
        method: 'post',
        data: {
          'name': that.props.profile.name,
          'avatar': that.props.profile.picture,
          'title': that.state.title,
          'message': that.state.message,
          'anon': that.state.anon,
        },
        url: `http://localhost:8000/api/posts/${that.state.phase}`,
      }).then(() => {
        that.setState({dialogOpen: true});
        setTimeout(() => {that.context.router.push(`/${that.state.phase}`);}, 2500);
      });
    }
  }

  titleChangeHandler(e) {
    this.setState({title: e.target.value});
  }

  messageChangeHandler(e) {
    this.setState({message: e.target.value});
  }

  phaseChangeHandler(e) {
    this.setState({phase: e.target.value});
  }

  toggleChangeHandler() {
    this.setState({anon: !this.state.anon});
  }

  dialogCloseHandler() {
    this.setState({dialogOpen: false});
  }

  renderTitleTextField() {
    return (
      <TextField
        onChange={this.titleChangeHandler.bind(this)}
        value={this.state.title}
        hintText="This is a example title"
        floatingLabelText="Please input a title for your affirmation"
        errorText={this.state.errors.title}
        fullWidth={true}
      />
    );
  }

  renderMessageTextField(props) {
    return (
      <TextField
        onChange={this.messageChangeHandler.bind(this)}
        value={this.state.message}
        hintText="Best advice ever"
        floatingLabelText="Please spread your knowledge and experience to our community. :D"
        fullWidth={true}
        multiLine={true}
        rows={8}
        errorText={this.state.errors.message}
      />
    );
  }

  renderPhaseSelector() {
    return (
      <div>
        <div>Phase</div>
        <RadioButtonGroup name='phaseSelector' onChange={this.phaseChangeHandler.bind(this)}>
          <RadioButton value='wanttolearn'label='Want to Learn'/>
          <RadioButton value='learningtocode'label='Learning to Code'/>
          <RadioButton value='jobhunt'label='Looking for a Job'/>
          <RadioButton value='onthejob'label='Working as a Software Engineer'/>
        </RadioButtonGroup>
      </div>
    );
  }

  renderAnonToggle(props) {
    return (
      <Toggle
        label="Anonymous?"
        onToggle={this.toggleChangeHandler.bind(this)}
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

  render() {
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 20,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div>
        <h2 style={center}>Submit an Affirmation</h2>
        <div style={center}>
          <div>
            <Paper style={paperStyle} zDepth={4}>
              <form onSubmit={this.validateAndSubmit.bind(this)}>
                <div style={{ margin: 20 }}>
                  <div>
                    {this.renderTitleTextField()}
                  </div><br />
                  <div>
                    {this.renderMessageTextField()}
                  </div><br />
                  <div>
                    {this.renderPhaseSelector()}
                  </div><br />
                  <div>
                    {this.renderAnonToggle()}
                  </div><br />
                  <div style={center}>
                    {this.renderSubmitButton()}
                  </div><br />
                  <div style={center}>
                    {this.renderSuccessDialog()}
                  </div>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
export default connectProfile(CreatePost)
