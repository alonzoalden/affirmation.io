import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
import Avatar from 'material-ui/Avatar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
// FROM DINO
import InlineEdit from 'react-edit-inline';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
//
// const gitHubAtts = [ // 10-16: GitHub, 17-100: Google, 100-120: LinkedIn
//   'name',
//   'email',
//   'picture',
//   'nickname',
//   'url',
//   'hmtl_url',
//   'location',
// ];
//
// const googleAtts = [ // user_metadata.location -- NYC
//   'email',
//   'name',
//   'picture',
//   'gender',
//   'nickname',
// ];
//
// const linkedInAtts = [
//
// ];

class EditProfile extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    error: null,
    saved: false,
    saving: false,
    account: ''
  }

  isGitHub() {
    if (this.props.profile.html_url !== undefined) {
      console.log('Using GitHub');
      this.setState({
        account: 'GitHub'
      });
      console.log(this.props.profile);
    }
  }
  isGoogle() {
    if (this.props.profile.gender !== undefined) {
      console.log('Using Google');
      this.setState({
        account: 'Google'
      });
      console.log(this.props.profile);
    }
  }
  islinkedIn() {
    if (this.props.profile.summary !== undefined) {
      console.log('Using linkedIn');
      this.setState({
        account: 'linkedIn'
      });
      console.log(this.props.profile);
    }
  }

  accountChecker() {
    this.isGitHub();
    this.isGoogle();
    this.islinkedIn();
  }

  componentDidMount() {
    this.accountChecker();
    console.log('----');
    console.log(this.state);
  }
  renderProfileInfo() {
    const profile = this.props.profile;
    const user_metadata = profile.user_metadata || {};
    const innerPaperStyle = {
      width: 550,
      margin: 35,
      overflow: 'auto'
    };
    return (
      <div style={innerPaperStyle}>
        <p><strong>Nickname:</strong> <InlineEdit text={profile.nickname} /></p>
        <p><strong>Email:</strong> <InlineEdit text={profile.email} /></p>
        <p><strong>Created At:</strong> <InlineEdit text={profile.created_at} /></p>
        <p><strong>Updated At:</strong> <InlineEdit text={profile.updated_at} /></p>
        <p><strong>Location:</strong> <InlineEdit text={user_metadata.location || 'unknown'} /></p>
      </div>
    );
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({saving: true}, async () => {
      const error = await this.props.onUpdateProfile({
        user_metadata: {
          location: this.locationInput.value
        }
      });
      this.setState({error, saved: !error, saving: false});
    });
  }

  onClearSaved = (event) => {
    this.setState({saved: false});
  }

  render() {
    const {profile} = this.props;
    const {saving, saved} = this.state;
    const flexbox = {
      'display': '-webkit-flex',
      'display': '-ms-flexbox',
      'display': 'flex',
      'overflow': 'hidden'
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const paperStyle = {
      height: 600,
      width: 600,
      margin: 35,
      overflow: 'auto',
      backgroundColor: '#FFDB77'
    };
    const barStyle = {
      backgroundColor: '#867DCC'
    }
    const titleStyle = {
      fontFamily: 'Nunito',
      color: '#FFDB77'
    };
    return (
      <div className={flexbox}>
        <div className="col-md-6 LightPurple">
          <div style={centerPaper}>
            <Paper style={paperStyle} zDepth={1}>
              <Toolbar style={barStyle}>
                <ToolbarGroup>
                  <Avatar src={profile.picture} />
                </ToolbarGroup>
                <ToolbarGroup lastChild={false}>
                  <ToolbarTitle style={titleStyle} text={profile.name} />
                </ToolbarGroup>
              </Toolbar>
              {this.renderProfileInfo()}
            </Paper>
          </div>
        </div>

        <div className="col-xs-12 col-md-6 LightPurple" style={{ 'height': '50vh' }}>
          <div className="EditProfile-heading">Edit Profile</div>
          <form className="EditProfile-form" onSubmit={this.onSubmit} onChange={this.onClearSaved}>
            <fieldset className="EditProfile-fieldset" disabled={saving}>
              <label className="EditProfile-locationLabel" htmlFor="location">Location</label>
              <input
                ref={(ref) => this.locationInput = ref}
                className="EditProfile-locationInput"
                id="location"
                type="text"
                placeholder="City or State"
                />
              <div className="EditProfile-formControls">
                <button className="EditProfile-submitButton" type="submit">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                {saved && (
                  <div className="EditProfile-saved">Saved</div>
                )}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default connectProfile(EditProfile);
