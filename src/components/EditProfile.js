import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
// FROM DINO
// import InlineEdit from 'react-edit-inline';
//
import Paper from 'material-ui/Paper';

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
    }
  }
  isGoogle() {
    if (this.props.profile.gender !== undefined) {
      console.log('Using Google');
      this.setState({
        account: 'Google'
      });
    }
  }
  islinkedIn() {
    if (this.props.profile.summary !== undefined) {
      console.log('Using linkedIn');
      this.setState({
        account: 'linkedIn'
      });
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
    this.setState({account : 'manual'});
    console.log(this.state);
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
    const user_metadata = profile.user_metadata || {};
    const flexbox = {
      'display': '-webkit-flex',
      'display': '-ms-flexbox',
      'display': 'flex',
      'overflow': 'hidden'
    };

    return (
      <div className={flexbox}>
        <div className="col-xs-12 col-md-6 LightPurple" style={{ 'height': '50vh' }}>
          <div className="EditProfile-heading">Your Profile</div>
          <div className="EditProfile-profile">
            <p><strong>Nickname:</strong> {profile.nickname}</p>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Created At:</strong> {profile.created_at}</p>
            <p><strong>Updated At:</strong> {profile.updated_at}</p>
            <p><strong>Location:</strong> {user_metadata.location || 'unknown'}</p>
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

        <div className="col-xs-12 col-md-6 Blue" style={{ 'height': '50vh' }}>

        </div>
        <div className="col-xs-12 col-md-6 Blue" style={{ 'height': '50vh' }}>

        </div>
      </div>
    );
  }
}

export default connectProfile(EditProfile);
