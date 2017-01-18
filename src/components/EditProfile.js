import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
import Avatar from 'material-ui/Avatar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import axios from 'axios';
import Badge from 'material-ui/Badge';
import { List, ListItem } from 'material-ui/List';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Face from 'material-ui/svg-icons/action/face';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import FlatButton from 'material-ui/FlatButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Editor from 'react-medium-editor';
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

  getUser() {
    axios.get('/api/users/' + this.props.profile.email)
    .then((user) => {
      user.data.posts.sort((a,b) => {
        return (a.favorites < b.favorites) ? 1 : -1
      })
      this.setState({ userProfile: user.data });
      this.objectify(user.data.favorites);
      console.log('state in getUser:', this.state);
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

  objectify(arrayOfFavorites) {
    let favesCache= {};
    for(let id of arrayOfFavorites) {
      let postId = id.postId
      favesCache[postId] = postId;
    }
    this.setState({ allFaves: favesCache });
  }

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
      url: `/api/users/${this.state.userProfile.user.email}`,
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
  }

  handleMediumEdit(param, text, medium) {
    this.setState({
      [param]: text
    });
  }

  renderProfileCard() {
    let profile = this.state.userProfile.user;
    const cardStyle = {
      width: 275,
      overflow: 'auto'
    };
    // const imageInput = {
    //   cursor: 'pointer',
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   right: 0,
    //   left: 0,
    //   width: '100%',
    //   opacity: 0,
    // };
    const buttonStyle = {
      backgroundColor: '#FFDB77'
    };
    return (
      <Card style={cardStyle} zDepth={1}>
        <CardHeader style={{backgroundColor: 'white'}}
          title={<InlineEdit style={{width: '100%'}} text={profile.name}
          paramName="name" change={this.handleProfileEdit.bind(this, 'name')} />}
          titleStyle={{fontFamily: 'Nunito', color: '#867DCC', fontSize: 26}}/>
        />
        <div style={{height: 275, width: 275}}>
          <Avatar src={profile.avatar} size={275} style={{borderRadius: 3}}/>
        </div>
        <CardText style={{fontFamily: 'Nunito'}}>
          <span style={{fontSize: 22}}>
            <strong style={{color: '#867DCC'}}>Job: </strong>
            <InlineEdit text={profile.job} paramName="job"
              change={this.handleProfileEdit.bind(this, 'job')}
            />
          </span>
          <br />
          <span>
            <strong style={{color: '#867DCC'}}>Location: </strong>
            <InlineEdit text={profile.location} paramName="location"
              change={this.handleProfileEdit.bind(this, 'location')}
            />
          </span>
          <h3 style={{color: '#867DCC'}}><strong>About Me</strong></h3>
          <Divider style={{backgroundColor: '#867DCC'}}/>
          <br />
          <Editor text={profile.about} onChange={this.handleMediumEdit.bind(this, 'about')}
            options={{disableEditing: false, toolbar: false}} />
          <br />
        </CardText>
        <BottomNavigation style={buttonStyle}>
          <BottomNavigationItem
            label="Update Profile"
            labelPosition="before"
            icon={<Refresh />}
            onClick={this.handleSubmit.bind(this)}
            />
        </BottomNavigation>
        <Snackbar
          open={this.state.open}
          message="Profile was updated!"
          autoHideDuration={3000}
        />
      </Card>
    );
  }

  renderProfileOptions() {
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      margin: 25,
      overflow: 'auto'
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={innerPaperStyle}>
        <div style={center}>
          <FlatButton label="Delete Account" style={{backgroundColor: '#ED222A', color: 'white'}}
            icon={<ActionDeleteForever />} />
        </div>
      </div>
    );
  }

  renderPostList() {
    const profile = this.state.userProfile;
    if (profile) {
      return (
        <div>
          <List>
          {profile.posts.map((post) => {
            if (!post.anon) {
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
                      primaryText={<Editor text={post.title}
                        options={{disableEditing: true, toolbar: false }} />}
                      secondaryText={<Editor text={post.message}
                        options={{disableEditing: true, toolbar: false }} />}
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
                      primaryText={<Editor text={post.title}
                        options={{disableEditing: true, toolbar: false }} />}
                      secondaryText={<Editor text={post.message}
                        options={{disableEditing: true, toolbar: false }} />}
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

  render() {
    const flexbox = {
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      overflow: 'hidden',
    };
    const centerPaper = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 42
    };
    const paperStyle = {
      width: 800,
      overflow: 'auto',
    };
    const barStyle = {
      backgroundColor: '#867DCC',
      fontFamily: 'Nunito',
    };
    const innerPaperStyle = {
      fontFamily: 'Nunito',
      overflow: 'auto'
    };

    if (!this.state.userProfile) {
      return (
        <div>
          Loading Profile...
        </div>
      );
    }
    return (
      <div className={flexbox}>
        <div className="col-md-2 col-md-offset-2" style={{paddingTop: 42}}>
          {this.renderProfileCard()}
        </div>
        <div className="col-md-6 col-md-offset-1">
          <div style={centerPaper}>
            <Paper style={paperStyle} zDepth={1}>
              <Tabs inkBarStyle={{backgroundColor: '#FFDB77'}}>
                <Tab style={barStyle} label="Affirmations" icon={<Face />}>
                  {this.renderPostList()}
                </Tab>
                <Tab style={barStyle} label="Affirmations" icon={<FavoriteBorder />} >
                  {this.renderFavoriteList()}
                </Tab>
                <Tab style={barStyle} label="Settings" icon={<ActionSettings />} >
                  {this.renderProfileOptions()}
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
