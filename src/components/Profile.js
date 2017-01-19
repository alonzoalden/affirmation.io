import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './EditProfile.css';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import axios from 'axios';
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui/svg-icons/action/face';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import LinearProgress from 'material-ui/LinearProgress';

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

  componentWillMount() {
    this.getUser();
    this.getPosts();
  }


  renderProfileCard() {
    let profile = this.state.userProfile.user;
    const cardStyle = {
      width: 275,
      overflow: 'auto'
    };
    return (
      <Card style={cardStyle} zDepth={1}>
        <CardHeader style={{backgroundColor: 'white'}}
          title={profile.name}
          titleStyle={{fontFamily: 'Nunito', color: '#867DCC', fontSize: 26}}
        />
        <div style={{height: 275, width: 275}}>
          <Avatar src={profile.avatar} size={275} style={{borderRadius: 3}}/>
        </div>
        <CardText style={{fontFamily: 'Nunito'}}>
          <span>
            <div style={{color: '#867DCC', fontWeight: 'bold'}}>Job: <span style={{color: 'black'}}>{profile.job}</span></div>
          </span>
          <span>
            <div style={{color: '#867DCC', fontWeight: 'bold'}}>Location: <span style={{color: 'black'}}>{profile.location}</span></div>
          </span>
          <h3 style={{color: '#867DCC'}}><strong>About Me</strong></h3>
          <Divider style={{backgroundColor: '#867DCC'}}/>
          <br />
          <div><Editor text={profile.about}
            options={{disableEditing: true, toolbar: false }} /></div>
          <br />
        </CardText>
      </Card>
    );
  }

  renderPostList() {
    const profile = this.state.userProfile
    if (profile) {
      return (
        <div style={{ marginTop: -8 }}>
          <List>
          {profile.posts.map((post) => {
            console.log(profile);
            if(!post.anon) {
              return (
                <div>
                  <Divider />
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
    if (this.state.allFaves) {
      return (
        <div style={{ marginTop: -8 }}>
          <List>
          {this.state.allPosts.map((post) => {
            if(this.state.allFaves[post.id]) {
              return (
                <div>
                  <Divider />
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
      display: 'flex',
      justifyContent: 'center',
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
      color: '#FFDB77'
    };
    if (this.state.userProfile && this.state.userProfile.user === undefined) {
      return (
        <div><LinearProgress mode="indeterminate" /></div>
      );
    }

    if (!this.state.userProfile) {
      return (
        <div><LinearProgress mode="indeterminate" /></div>
      );
    }
    return (
      <div style={flexbox}>
        <div className="col-md-2" style={{paddingTop: 42}}>
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
