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
import { Link } from 'react-router';
import validator from 'validator';
import axios from 'axios';


class CreatePost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      title: '',
      message: '',
      anon: false,
      errors: {},
      submitting: false,
    };
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
      //api request here
      that.setState({errors: {}});
      axios({
        method: 'post',
        data: {
          'title': that.state.title,
          'message': that.state.message,
          'anon': that.state.anon,
        },
        url: `localhost:3000/posts`,
      });
    }
  }

  titleChangeHandler(e) {
    this.setState({title: e.target.value});
  }

  messageChangeHandler(e) {
    this.setState({message: e.target.value});
  }

  toggleChangeHandler() {
    this.setState({anon: !this.state.anon});
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
        hintText="ex. This is the best advice you will ever receive!"
        floatingLabelText="Please spread your knowledge and experience to our community. :D"
        fullWidth={true}
        multiLine={true}
        rows={8}
        errorText={this.state.errors.message}
      />
    );
  }

  renderToggle(props) {
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
                    {this.renderToggle()}
                  </div><br />
                  <div style={center}>
                    {this.renderSubmitButton()}
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
export default CreatePost

