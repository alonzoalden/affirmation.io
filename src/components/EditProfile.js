import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
import Avatar from 'material-ui/Avatar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
// FROM DINO
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import InlineEdit from 'react-edit-inline';
import FlatButton from 'material-ui/FlatButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
//
let mainAcc = '';
let secondaryAccs = [
  'github',
  'google-oauth2',
  'linkedin'
];
const gitHubAtts = [
  'email',
  'name',
  'nickname',
  'html_url',
  'location',
  'public_repos',
  'followers',
  'following',
  'updated_at'
  /**
  EXTRA INFO --------- ---------  --------- --------->
  'public_gists',
  'picture',
  'gravatar_id',
  'type',
  'site_admin',
  'user_metadata',
  'emails',
  'clientID',
  'user_id',
  'identities',
  'created_at',
  'email_verified',
  'sub',
  API LINKS ----- ----- ----->
  'followers_url',
  'following_url',
  'gists_url',
  'starred_url',
  'subscriptions_url',
  'organizations_url',
  'repos_url',
  'events_url',
  'received_events_url'
  <----- ----- ----- API LINKS
  <--------- --------- --------- --------- EXTRA INFO
  **/
];

const googleAtts = [ // user_metadata.location -- NYC
  'gender'
  // 'email',
  // 'name',
  // 'picture',
];
//
const linkedInAtts = [
  'headline',
  'industry',
  'summary'
  // location.name
];

class EditProfile extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    error: null,
    saved: false,
    saving: false
  }

  findMain(profile) {
    if (profile.html_url !== undefined) {
      mainAcc = 'github';
      secondaryAccs = [
        'google-oauth2',
        'linkedin'
      ];
    } else if (profile.gender !== undefined) {
      mainAcc = 'google-oauth2';
      secondaryAccs = [
        'github',
        'linkedin'
      ];
    } else if (profile.summary !== undefined) {
      mainAcc = 'linkedin';
      secondaryAccs = [
        'github',
        'google-oauth2'
      ];
    }
    console.log('Main Account:', mainAcc);
  }

  addDataFrom(origAcc, acc2, acc3) {
    let arr = [];


    for (let i = 0; i < acc2.length; i++) {
      arr.push(acc2[i]);
    }
    for (let i = 0; i < acc3.length; i++) {
      arr.push(acc3[i]);
    }
    return arr;
  }

  provideDetails() {
    const profile = this.props.profile;
    this.findMain(profile);
    console.log('----- profile -----');
    console.log(profile);
    let details = [];
    if (mainAcc === 'github') {
      details = this.addDataFrom(gitHubAtts, 'linkedin', 'google-oauth2');
    } else if (mainAcc === 'linkedin') {
      details = this.addDataFrom(linkedInAtts, 'github', 'google-oauth2');
    } else if (mainAcc === 'google-oauth2') {
      details = this.addDataFrom(googleAtts, 'github', 'linkedin');
    }
    return gitHubAtts;
  }

  renderProfile() {
    const profile = this.props.profile;
    const user_metadata = profile.user_metadata || {};
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      width: 550,
      margin: 35,
      overflow: 'auto'
    };
    const strong = {
      fontSize: 18,
      color: '#867DCC'
    };
    const button = {
      display: 'flex',
      justifyContent: 'center',
      horizontalAlign: 'center'
    };
    const buttonText = {
      fontSize: 18,
      color: '#867DCC'
    };
    return (
      <div style={innerPaperStyle}>
        <p><span style={strong}>Nickname:</span> <InlineEdit text={profile.nickname} /></p>
        <p><span style={strong}>Email:</span> <InlineEdit text={profile.email} /></p>
        <p><span style={strong}>Location:</span> <InlineEdit text={user_metadata.location || 'unknown'} /></p>
        <div style={button}>
          <FlatButton style={buttonText} label="Standard Profile" />
        </div>
        {this.provideDetails().map((detail) => {
          return (
              <p><span style={strong}>{detail}:</span> <InlineEdit text={profile[detail]} /></p>
          );
        })}
        <div style={button}>
          <FlatButton style={buttonText} label="Update Profile" icon={<Refresh />}/>
        </div>
      </div>
    );
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({saving: true}, async () => {
      const error = await this.props.onUpdateProfile({
        user_metadata: {
          location: this.locationInput.value,
          TEST: [{'post1' : true}, {'post3' : true}]
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
      color: '#FFDB77',
      paddingLeft: 10
    };
    return (
      <div className={flexbox}>
        <div className="col-md-6 LightPurple">
          <div style={centerPaper}>
            <Paper style={paperStyle} zDepth={2}>
              <Toolbar style={barStyle}>
                <ToolbarGroup firstChild={true} style={{paddingLeft: 10}}>
                  <Avatar src={profile.picture} />
                  <ToolbarTitle style={titleStyle} text={profile.name} />
                </ToolbarGroup>
                <ToolbarGroup>
                  <ActionSettings />
                </ToolbarGroup>
              </Toolbar>
              {this.renderProfile()}
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
