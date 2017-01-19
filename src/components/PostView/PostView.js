 /**
* PostView
*/
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Delete from 'material-ui/svg-icons/action/delete';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import HorizontalDots from 'material-ui/svg-icons/navigation/more-horiz';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Editor from 'react-medium-editor';
import ReactTooltip from 'react-tooltip';
import './PostView.css';
import DisqusComments from '../Comments.js';
import Dialog from 'material-ui/Dialog';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import {connectProfile} from '../../auth';
import Avatar from 'material-ui/Avatar';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackFlag: false,
      snackFavorites: false,
      snackHelpful: false,
      snackUnhelpful: false,
      dialogOpen: false,
      deleting: false,
      updating: false
    }
  }

  static propTypes = {
    ...connectProfile.PropTypes,
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount(){
    this.setState({
      helpful: this.props.post.helpful,
      unhelpful: this.props.post.unhelpful,
      flags: this.props.post.flag,
      favorites: this.props.post.favorites,
      sentiment: this.props.post.sentiment || [],
      userVote: this.props.sentiment,
      userFlagged: this.props.flags,
      userFavorites: this.props.favorites,
      authUser:  this.props.authUser,
      title: this.props.post.title,
      message: this.props.post.message
    });
  }

  isHelpful() { //unclicking helpful
    if(this.checkUser()) {
      this.setState({
        snackFlag: false,
        snackFavorites: false,
        snackUnhelpful: false,
        snackHelpful: true,
      });
    } else {
      console.log('State before +Click:', this.state);
      if (this.state.userVote.length === 1) {
        if (this.state.userVote[0].helpfulness) {  //<--- addresses the true property
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/null', {
            email: this.state.authUser.email,
            helpful: this.state.helpful - 1,
            unhelpful: this.state.unhelpful,
            sentiment: this.state.sentiment - 1,
          })
          .then(()=>{
            console.log('Clicked helpful 2nd time');
            this.setState({
              helpful: this.state.helpful - 1,
              sentiment: this.state.sentiment - 1,
              userVote: []
            });
          })
        } else { //<--- addresses the false property
         //change their last vote from false to true
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/helpful', {
            email: this.state.authUser.email,
            helpful: this.state.helpful + 1,
            unhelpful: this.state.unhelpful - 1,
            sentiment: this.state.sentiment + 2,
            helpfulness: true,
          })
          .then(() => {
            console.log('clicked helpful from unhelpful');
            this.setState({
              helpful: this.state.helpful + 1,
              unhelpful: this.state.unhelpful - 1,
              sentiment: this.state.sentiment + 2,
              userVote: [{helpfulness: true}]
            });
          })
        }
      } else { //<---- clicking helpful the first time
        return axios.post('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/helpful', {
          email: this.state.authUser.email,
          sentiment: this.state.sentiment + 1,
          helpful: this.state.helpful + 1,
        })
        .then(()=>{
          console.log('first helpful');
          this.setState({
            sentiment: this.state.sentiment + 1,
            helpful: this.state.helpful + 1,
            userVote: [{ helpfulness: true}]
          });
        })
      }
    }
  }

  isUnhelpful() { //unclicking unhelpful
    if(this.checkUser()) {
      this.setState({
        snackFlag: false,
        snackHelpful: false,
        snackFavorites: false,
        snackUnhelpful: true,
      });
    } else {
      console.log('State before -Click:', this.state);
      if (this.state.userVote.length === 1) {
        if (!this.state.userVote[0].helpfulness) {  //<--- addresses the true property
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/null', {
            email: this.state.authUser.email,
            helpful: this.state.helpful,
            unhelpful: this.state.unhelpful - 1,
            sentiment: this.state.sentiment + 1,
          })
          .then(()=>{
            console.log('clicked unhelpful 2nd time');
            this.setState({
              unhelpful: this.state.unhelpful - 1,
              sentiment: this.state.sentiment + 1,
              userVote: []
            });
          })
        } else { //<--- addresses the false property
         //change their last vote from true to false
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/unhelpful', {
            email: this.state.authUser.email,
            helpful: this.state.helpful - 1,
            unhelpful: this.state.unhelpful + 1,
            sentiment: this.state.sentiment - 2,
            helpfulness: false,
          })
          .then(()=>{
            console.log('clicked unhelpful from helpful');
            this.setState({
              helpful: this.state.helpful - 1,
              unhelpful: this.state.unhelpful + 1,
              sentiment: this.state.sentiment - 2,
              userVote: [{ helpfulness: false }]
            });
          })
        }
      } else { //<---- clicking unhelpful the first time
        return axios.post('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/vote/unhelpful', {
          email: this.state.authUser.email,
          sentiment: this.state.sentiment - 1,
          unhelpful: this.state.unhelpful + 1,
        })
        .then(()=>{
          console.log('first unhelpful');
          this.setState({
            sentiment: this.state.sentiment - 1,
            unhelpful: this.state.unhelpful + 1,
            userVote: [{ helpfulness: false}]
          });
        })
      }
    }
  }

  favorite() {
    if(this.checkUser()) {
      this.setState({
        snackFlag: false,
        snackHelpful: false,
        snackUnhelpful: false,
        snackFavorites: true,
      });
    } else {
      if (this.state.userFavorites.length === 1) {
        console.log('userFavorites is populated')
        if (this.state.userFavorites[0].favorite) {  //<--- addresses the true property
          console.log('delete is about to be called. state: ', this.state);
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/favorite/unfavorite', {
            email: this.state.authUser.email,
            favorites: this.state.favorites - 1
          })
          .then(()=>{
            console.log('Unfavorited');
            this.setState({
              favorites: this.state.favorites - 1,
              userFavorites: []
            });
            console.log('STATE AFTER FAV DELETE: ', this.state);
          })
          .catch((error) => {
            console.log('unfavorited error: ', error);
          })
        }
      } else { //<---- clicking favorite the first time
        return axios.post('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/favorite/favorite', {
          email: this.state.authUser.email,
          favorites: this.state.favorites + 1
        })
        .then(()=>{
          this.setState({
            favorites: this.state.favorites + 1,
            userFavorites: [{ favorite: true }]
          });
          console.log('favorited, userFavorites: ', this.state.userFavorites);
        })
      }
    }
  }

  flag() {
    if(this.checkUser()) {
      this.setState({
        snackHelpful: false,
        snackUnhelpful: false,
        snackFavorites: false,
        snackFlag: true,
      });
    } else {
      console.log(this.state);
      if (this.state.userFlagged.length === 1) {
        console.log('userFlag is populated')
        if (this.state.userFlagged[0].flag) {  //<--- addresses the true property
          console.log('delete is about to be called. state: ', this.state);
          return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/flag/unflag', {
            email: this.state.authUser.email,
            flags: this.state.flags - 1
          })
          .then(()=>{
            console.log('Unflag');
            this.setState({
              flags: this.state.flags - 1,
              userFlagged: []
            });
            console.log('STATE AFTER FLAG DELETE: ', this.state);
          })
          .catch((error) => {
            console.log('unflag error: ', error);
          })
        }
      } else { //<---- clicking favorite the first time
        console.log('this is the first flag');
        return axios.post('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/flag/flag', {
          email: this.state.authUser.email,
          flags: this.state.flags + 1
        })
        .then(()=>{
          this.setState({
            flags: this.state.flags + 1,
            userFlagged: [{ flag: true }]
          });
          console.log('flagged, userFlag: ', this.state.userFlagged);
        })
      }
    }
  }

  checkUser() {
    return this.state.authUser.email === this.props.post.userEmail;
  }

  renderUserControls() {
    const rightIcon = {
      paddingTop: 35,
      paddingRight: 0
    };
    if(this.checkUser()) {
      return (
        <IconMenu style={rightIcon}
          iconButtonElement={<IconButton data-tip='More'><HorizontalDots /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}>
          <MenuItem primaryText="Update Post" onClick={this.submitEdit.bind(this)}/>
          <MenuItem primaryText="Delete This Post" onClick={this.deletePost.bind(this)}/>
        </IconMenu>
      );
    }
  }

  deletePost() {
    axios.delete('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/' + this.props.post.userEmail)
    .then(() => {
      console.log('post was deleted!');
      this.setState({
        deleting: true,
        dialogOpen: true
      });
      setTimeout(() => {
        this.context.router.push(`/${this.props.post.phase}`);
      }, 2500);
    })
    .catch((error) => {
      console.log('error deleting post:', error);
    })
  }

  titleChangeHandler(text, medium) {
    this.setState({title: text});
  }

  messageChangeHandler(text, medium) {
    this.setState({message: text});
  }

  submitEdit(){
    return axios.put('/api/posts/' + this.props.post.phase + '/' + this.props.post.id + '/' + this.state.authUser.email, {
      phase: this.props.post.phase,
      title: this.state.title,
      message: this.state.message,
      anon: this.props.post.anon
    })
    .then(()=>{
      console.log('Put request successful!, ', this.state);
      this.setState({
        updating: true,
        dialogOpen: true
      });
      setTimeout(() => {
        this.context.router.push(`/${this.props.post.phase}`);
      }, 2500);
    })
    .catch((err)=>{
      console.log('Put request error: ', err)
    });
  }

  renderEditor(){
    const title = {
      fontSize: 40,
      paddingTop: 15,
      paddingLeft: 20,
      fontFamily: 'Roboto'
    };
    const message = {
      fontSize: 22,
      paddingTop: 15,
      paddingLeft: 20,
      paddingBottom: 20,
      paddingRight: 20,
      lineHeight: 1.1,
      fontFamily: 'Roboto'
    };
    if (this.checkUser()){
      return (
        <div>
        <Editor
          data-placeholder='Title'
          className='glowing-border'
          style={title}
          text={this.props.post.title}
          onChange={this.titleChangeHandler.bind(this)}
          options={{toolbar: false, placeholder: { hideOnClick: false}}}
        />
        <Editor
          data-placeholder='Write advice here...'
          className='glowing-border'
          style={message}
          text={this.props.post.message}
          onChange={this.messageChangeHandler.bind(this)}
          options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'h2', 'h3', 'quote']}, placeholder: { hideOnClick: false}}}
        />
        </div>
      )
    } else {
      return (
        <div>
          <Editor
            style={title}
            text={this.props.post.title}
            options={{disableEditing: true, toolbar: false }}
          />
          <Editor
            style={message}
            text={this.props.post.message}
            options={{disableEditing: true, toolbar: false }}
          />
        </div>
      )
    }
  }

  renderNameLink() {
    if (this.props.post.anon) {
      return (
        <span>Anonymous</span>
      );
    } else {
      return (
        <Link style={{textDecoration: 'none', color: 'black'}} to={`/profile/${this.props.post.user.email}`}>{this.props.post.user.name}</Link>
      );
    }
  }

  renderAvatarLink() {
    if (this.props.post.anon) {
      return (
        <Avatar size={60} src="https://s-media-cache-ak0.pinimg.com/564x/4d/b7/b7/4db7b7ecb39c4eebc5b8f5358773e4a2.jpg" />
      );
    } else {
      return (
        <Link to={`/profile/${this.props.post.user.email}`}>
          <Avatar size={60} src={this.props.post.user.avatar} />
        </Link>
      );
    }
  }

  render() {
    const cardStyle = {
      width: 750,
      margin: 20,
      marginTop: 0,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const titleStyles = {
      marginTop: 43,
      padding: 0
    };
    const subtitleStyles = {
      padding: 0
    };
    const cardHeader = {
      marginTop: 0,
      padding: 0,
      paddingLeft: 20,
    };
    const icons = {
      paddingTop: 35,
      paddingRight: 0
    };

    const tooltip = {
      fontFamily: 'Roboto'
    };
    return (
      <div style={{backgroundColor: 'white'}}>
        <div style={center}>
          <div style={{ margin: 30 }}>
            <Card
              style={cardStyle}
            >
              <CardHeader
                className='float'
                style={cardHeader}
                titleStyle={titleStyles}
                subtitleStyle={subtitleStyles}
                title={this.renderNameLink()}
                subtitle={this.props.post.anon ? 'Cyberspace' : this.props.post.user.job + ' - ' + this.props.post.user.location}
                avatar={this.renderAvatarLink()}
              >
              <Badge
                badgeContent={this.state.favorites}
                primary={true}
                badgeStyle={{top: 35, right: 8}}
                >
                <IconButton style={icons} data-tip="You love this affirmation" onClick={this.favorite.bind(this)}>
                  <FavoriteBorder />
                </IconButton>
              </Badge>
              <Badge
                badgeContent={this.state.helpful}
                primary={true}
                badgeStyle={{top: 35, right: 8}}
              >
                <IconButton style={icons} data-tip="This affirmation is helpful" onClick={this.isHelpful.bind(this)}>
                  <SentimentVerySatisfied />
                </IconButton>
              </Badge>
              <Badge
                badgeContent={this.state.unhelpful}
                primary={true}
                badgeStyle={{top: 35, right: 8}}
              >
                <IconButton style={icons} data-tip="This affirmation is unhelpful" onClick={this.isUnhelpful.bind(this)}>
                  <SentimentVeryDissatisfied />
                </IconButton>
              </Badge>
              <Badge
                badgeContent={this.state.flags}
                primary={true}
                badgeStyle={{top: 35, right: 8}}
              >
                <IconButton style={icons} data-tip="This affirmation contains hate or vulgar content" onClick={this.flag.bind(this)}>
                  <ErrorOutline />
                </IconButton>
              </Badge>
              {this.renderUserControls()}
              </CardHeader><br />
              <Divider />
              {this.renderEditor()}
              <Snackbar
                open={this.state.snackFlag}
                message="If it's that bad just delete it..."
                autoHideDuration={3000}
              />
              <Snackbar
                open={this.state.snackFavorites}
                message="You cannot favorite your own affirmation. Nice try!"
                autoHideDuration={3000}
              />
              <Snackbar
                open={this.state.snackHelpful}
                message="Maybe lets let others decide? :)"
                autoHideDuration={3000}
              />
              <Snackbar
                open={this.state.snackUnhelpful}
                message="Don't be so hard on yourself! :)"
                autoHideDuration={3000}
              />
                <ReactTooltip
                  place='bottom'
                  style={tooltip}
                />
            </Card>
          </div>
        </div>
        <Dialog
          title="All Done!"
          modal={false}
          open={this.state.dialogOpen}
          >
          {this.state.deleting ? 'Your affirmation is now deleted! Thank you for your contributions!' : 'Your affirmation is now updated! Thank you for your contributions!'}
        </Dialog>
        <div style={center}>
          <div style={{ margin: 20, marginTop: 0 }}>
            <div style={{ width: 750, margin: 20, marginTop: 0 }}>
              <DisqusComments
                postUrl={`https://localhost:3000/${this.props.post.phase}/${this.props.post.id}`}
                post={`${this.props.post.phase}/${this.props.post.id}`}
                postTitle={this.props.post.title}
                url={"https://localhost:3000/"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostView;
