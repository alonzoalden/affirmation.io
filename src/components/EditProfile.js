import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
// import Avatar from 'material-ui/Avatar';
// import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ImageFilterVintage from 'material-ui/svg-icons/image/filter-vintage';
// import PlacesSpa from 'material-ui/svg-icons/places/spa';
// import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import axios from 'axios';
// FROM DINO
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import InlineEdit from 'react-edit-inline';
import FlatButton from 'material-ui/FlatButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
//
let mainAcc = '';
// let secondaryAccs = [
//   'github',
//   'google-oauth2',
//   'linkedin'
// ];
const gitHubAtts = [
  // 'email',
  // 'name',
  // 'nickname',
  // 'html_url',
  // 'location',
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
  API LINKS ----- ----- -----> CAN REQUEST INFO FROM THE FOLLOWING API ENDPOINTS:
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
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    error: null,
    saved: false,
    saving: false
  }

  getUser() {
    axios.get('http://localhost:8000/api/users/' + this.props.profile.email)
    .then((user) => {
      this.setState({ userProfile: user.data })
    })
    .then(() => {
      console.log('state:', this.state);
      this.provideDetails();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount() {
    this.getUser();
  }

  // findMain(profile) {
  //   if (profile.html_url !== undefined) {
  //     mainAcc = 'github';
  //     secondaryAccs = [
  //       'google-oauth2',
  //       'linkedin'
  //     ];
  //   } else if (profile.gender !== undefined) {
  //     mainAcc = 'google-oauth2';
  //     secondaryAccs = [
  //       'github',
  //       'linkedin'
  //     ];
  //   } else if (profile.summary !== undefined) {
  //     mainAcc = 'linkedin';
  //     secondaryAccs = [
  //       'github',
  //       'google-oauth2'
  //     ];
  //   }
  // }

  provideDetails() { // Returns info from main account
    console.log('details:', this.state.userProfile.user);
  }

  renderProfile() {
    const profile = this.props.profile;
    const user_metadata = profile.user_metadata || {};
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      margin: 25,
      overflow: 'auto'
    };
    const strong = {
      fontSize: 18,
      color: '#867DCC'
    };
    return (
      <div style={innerPaperStyle}>
        <p><span style={strong}>Email:</span> <InlineEdit text={profile.email} /></p>
        <p><span style={strong}>Location:</span> <InlineEdit text={user_metadata.location || 'unknown'} /></p>
        <p><span style={strong}>GitHub:</span> <a style={{textDecoration: 'none', color: 'black'}} href={profile.html_url}>{profile.nickname}</a></p>
        {gitHubAtts.map((detail) => {
          return (
            <p><span style={strong}>{detail}:</span> <InlineEdit text={profile[detail]} /></p>
          );
        })}
      </div>
    );
  }

  renderPostList() {
    console.log('state in PostList:',this.state);
    const profile = this.state.userProfile
    console.log('profile in PostList:', profile);
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 450,
        overflowX: 'auto',
      },
      titleStyle: {
        color: '#FFDB77'
      }
    };
    if (profile) {
      return (
        <div style={styles.root}>
          <GridList
            style={styles.gridList} cols={2.2}
            >
            {profile.posts.map((tile) => {
              return (
                <GridTile
                  key={tile.id}
                  title={tile.title}
                  titleStyle={styles.titleStyle}
                  subtitle={<span>Phase: <b>{tile.phase}</b></span>}
                  actionIcon={<IconButton><StarBorder color="#FFDB77" /></IconButton>}
                  >
                  <img src={profile.user.avatar} />
                </GridTile>
              )
            })}
          </GridList>
        </div>
      );
    }
  }

  // onSubmit = (event) => {
  //   event.preventDefault();
  //
  //   this.setState({saving: true}, async () => {
  //     const error = await this.props.onUpdateProfile({
  //       user_metadata: {
  //         location: this.locationInput.value
  //       }
  //     });
  //     this.setState({error, saved: !error, saving: false});
  //   });
  // }
  //
  // onClearSaved = (event) => {
  //   this.setState({saved: false});
  // }
  //
  // <div className="EditProfile-heading">Edit Profile</div>
  // <form className="EditProfile-form" onSubmit={this.onSubmit} onChange={this.onClearSaved}>
  //   <fieldset className="EditProfile-fieldset" disabled={saving}>
  //     <label className="EditProfile-locationLabel" htmlFor="location">Location</label>
  //     <input
  //       ref={(ref) => this.locationInput = ref}
  //       className="EditProfile-locationInput"
  //       id="location"
  //       type="text"
  //       placeholder="City or State"
  //       />
  //     <div className="EditProfile-formControls">
  //       <button className="EditProfile-submitButton" type="submit">
  //         {saving ? 'Saving...' : 'Save'}
  //       </button>
  //       {saved && (
  //         <div className="EditProfile-saved">Saved</div>
  //       )}
  //     </div>
  //   </fieldset>
  // </form>

  render() {
    const {profile} = this.props;
    const {saving, saved} = this.state;
    const flexbox = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#AB92F2'
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const paperStyle = {
      width: 800,
      margin: 35,
      overflow: 'auto',
      backgroundColor: '#FFDB77'
    };
    const cardStyle = {
      width: 350,
      margin: 20,
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
    const buttonStyle = {
      fontFamily: 'Nunito',
      backgroundColor: '#867DCC',
      color: '#FFDB77'
    };
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      margin: 25,
      overflow: 'auto'
    };
    if (this.state.userProfile && this.state.userProfile.user === undefined) {
      return (
        <div>Loading User Profile...</div>
      );
    }

    return (
      <div className={flexbox}>

        <div className="col-md-4 LightPurple">
          <Card style={cardStyle} zDepth={1}>
            <CardMedia overlay={<CardTitle subtitle={profile.identities[1].profileData.headline} />}>
              <img src={profile.picture} size={200} />
            </CardMedia>
            <CardTitle title={profile.name} subtitle="Bio" />
            <CardText style={{fontFamily: "Nunito"}}>{profile.identities[1].profileData.summary}</CardText>
          </Card>
        </div>

        <div className="col-md-8 LightPurple">
          <div style={centerPaper}>
            <Paper style={paperStyle} zDepth={2}>
              <Toolbar style={barStyle}>
                <ToolbarGroup>
                  <ToolbarTitle style={titleStyle} text="User Profile" />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                  <FlatButton style={buttonStyle} label="Update Profile" icon={<Refresh />}/>
                </ToolbarGroup>
              </Toolbar>
              {this.renderProfile()}
              <BottomNavigation style={barStyle}>
                <BottomNavigationItem style={titleStyle} label="Affirmations" icon={<ImageFilterVintage />} />
                <BottomNavigationItem style={titleStyle} label="Favorites" icon={<ActionFavorite />} />
              </BottomNavigation>
            </Paper>
          </div>
        </div>

        <div className="col-md-8" style={centerPaper}>
          <Paper style={paperStyle} zDepth={2}>
            <Toolbar style={barStyle}>
              <ToolbarGroup>
                <ToolbarTitle style={titleStyle} text="User Posts" />
              </ToolbarGroup>
            </Toolbar>
            <div style={innerPaperStyle}>
              {this.renderPostList()}
            </div>
          </Paper>
        </div>

      </div>
    );
  }
}

export default connectProfile(EditProfile);
