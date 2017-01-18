import React, {Component, browserHistory} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
// import Avatar from 'material-ui/Avatar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageFilterVintage from 'material-ui/svg-icons/image/filter-vintage';
// import PlacesSpa from 'material-ui/svg-icons/places/spa';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import axios from 'axios';
import Badge from 'material-ui/Badge';
// FROM DINO
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Face from 'material-ui/svg-icons/action/face';

//
import injectTapEventPlugin from 'react-tap-event-plugin';


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
    this.state = {
      value: "a",
      open: false
    };
  }

  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    error: null,
    saved: false,
    saving: false
  }


  objectify(arrayOfFavorites) {
    let favesCache= {};
    for(let id of arrayOfFavorites) {
      let postId = id.postId
      favesCache[postId] = postId;
    }
    this.setState({ allFaves: favesCache });
  }


  getUser() {
    let userPath = window.location.pathname.split("/").slice(-1)[0];
    axios.get('/api/users/' + userPath)
    .then((user) => {
      user.data.posts.sort((a,b) => {
         return (a.favorites < b.favorites) ? 1 : -1
      })
      this.setState({ userProfile: user.data })
      this.objectify(user.data.favorites);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getPosts() {
    axios.get('/api/allposts')
    .then((everyPost) => {
      console.log('everyPost: ', everyPost);
      this.setState({ allPosts: everyPost.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // store favorite ids in cache obj
  // get all posts where obj[post.id]

  // getFaves() {
  //   let userPath = window.location.pathname.split("/").slice(-1)[0];
  //   axios.get('/api/posts/phase/id/favorite/' + userPath )
  //   .then((faves) => {
  //     console.log(faves)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  componentWillMount() {
    this.getUser();
    this.getPosts();
  }

  handleSubmit() {
    axios({
      method: 'put',
      data: {
        'name': this.state.name,
        'avatar': this.state.userProfile.user.avatar,
        'job': this.state.job,
        'about': this.state.about,
        'location': this.state.location
      },
      url: `http://localhost:8000/api/users/${this.state.userProfile.user.email}`,
    }).then(() => {
      this.setState({
        open: true
      });
    });
  }

  handleProfileEdit(edited, event) {
    this.setState({
      [edited]: event[edited]
    });
    console.log('new state:', this.state);
  }

  renderProfileCard() {
    console.log('userProfile: ', this.state.userProfile);
    let profile = this.state.userProfile.user;
    console.log('state in card render:', this.state);
    const cardStyle = {
      width: 350,
      margin: 20,
      overflow: 'auto',
      backgroundColor: '#FFDB77'
    };
    const imageInput = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    };
    const buttonStyle = {
      fontFamily: 'Nunito',
      backgroundColor: '#867DCC',
      color: '#FFDB77',
    };
    return (
      <Card style={cardStyle} zDepth={1}>
        <CardMedia
          overlay={<CardTitle subtitle={profile.name}
          subtitleStyle={{fontFamily: 'Nunito', color: '#FFDB77', fontSize: 20}}/> }>
          <img src={profile.avatar} size={200} role="presentation" />
        </CardMedia>
        <CardTitle
          style={{fontFamily: "Nunito"}}
          title={'Job: ' + profile.job}
          subtitle={'Location: ' + profile.location}
        />
        <CardText style={{fontFamily: 'Nunito'}}>
          <h2 style={{color: '#867DCC'}}><strong>About Me</strong></h2>
          <Divider style={{backgroundColor: '#867DCC'}}/>
          <br />
          <div style={{width: '100%', height: '100%'}}>
            {profile.about}
          </div>
        </CardText>
      </Card>
    );
  }

  renderProfilePaper() {
    let profile = this.state.userProfile.user;
    const authProfile = this.props.profile;
    const user_metadata = authProfile.user_metadata || {};
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      margin: 25,
      overflow: 'auto'
    };
    const strong = {
      fontSize: 18,
      color: '#867DCC'
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={innerPaperStyle}>
        <div>
          <p><span style={strong}>Email:</span> <InlineEdit text={profile.email} /></p>
        </div>
        <div style={center}>
          <FlatButton style={{backgroundColor: '#ED222A'}} icon={<ActionDeleteForever />} />
        </div>
      </div>
    );
  }

  renderPostList() {
    const profile = this.state.userProfile
    const tableStyle = {
      fontFamily: 'Nunito',
      backgroundColor: '#FFDB77'
    };
    if (profile) {
      return (
        <div>
          <List>
          {profile.posts.map((post) => {
            console.log(profile);
            if(!post.anon) {
              return (
                <div>
                  <Link to={`/${post.phase}/${post.id}`} style={{ textDecoration: 'none' }}>
                  <ListItem
                    rightAvatar={
                      <Badge
                      badgeContent={post.favorites}
                      primary={true}
                      badgeStyle={{top: 5, right: 5}}
                      >
                        <FavoriteBorder />
                      </Badge>
                    }
                    primaryText={post.title}
                    secondaryText={
                      <p>{post.message}</p>
                    }
                    secondaryTextLines={2}
                  />
                  </Link>
                <Divider inset={true} />
                </div>
              )
            }
          })}
          </List>
        </div>
      );
    }
  }

  renderFavoriteList() {
    const profile = this.state.userProfile
    const tableStyle = {
      fontFamily: 'Nunito',
      backgroundColor: '#FFDB77'
    };
    if (this.state.allFaves) {
      return (
        <div>
          <List>
          {this.state.allPosts.map((post) => {
            if(this.state.allFaves[post.id]) {
              return (
                <div>
                  <Link to={`/${post.phase}/${post.id}`} style={{ textDecoration: 'none' }}>
                    <ListItem
                      rightAvatar={
                        <Badge
                        badgeContent={post.favorites}
                        primary={true}
                        badgeStyle={{top: 5, right: 5}}
                        >
                          <FavoriteBorder />
                        </Badge>
                      }
                      primaryText={post.title}
                      secondaryText={
                        <p>{post.message}</p>
                      }
                      secondaryTextLines={2}
                    />
                  </Link>
                  <Divider inset={true} />
                </div>
              )
            }
          })}
          </List>
        </div>
      );
    }
  }

  handleTabChange = (value) => {
    this.setState({
      value: value,
    });
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
    const barStyle = {
      backgroundColor: '#867DCC',
      fontFamily: 'Nunito',
      color: '#FFDB77'
    };
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      margin: 10,
      overflow: 'auto'
    };
    if (this.state.userProfile && this.state.userProfile.user === undefined) {
      return (
        <div>Loading User Profile...</div>
      );
    }

    if (!this.state.userProfile) {
      return (
        <div>
          Loading Profile...
        </div>
      );
    }
    return (
      <div className={flexbox}>

        <div className="col-md-4">
          {this.renderProfileCard()}
        </div>

        <div className="col-md-8">
          <div style={centerPaper}>
            <Paper style={paperStyle} zDepth={1}>
              <Tabs inkBarStyle={{backgroundColor: 'black'}}>
                <Tab style={barStyle} label="Affirmations" icon={<Face/>}>
                  <div style={innerPaperStyle}>
                    {this.renderPostList()}
                  </div>
                </Tab>
                <Tab style={barStyle} label="Affirmations" icon={<FavoriteBorder />} >
                  {this.renderFavoriteList()}
                </Tab>
              </Tabs>
              <Divider />
            </Paper>
          </div>
        </div>

      </div>
    );
  }
}

export default connectProfile(EditProfile);
