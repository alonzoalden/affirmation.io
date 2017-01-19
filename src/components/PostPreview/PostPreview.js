/**
*
* PostPreview
*
*/

import React from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import ReportProblem from 'material-ui/svg-icons/action/report-problem';
import Divider from 'material-ui/Divider';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import Avatar from 'material-ui/Avatar';

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
  }

  componentDidMount() {
  }

  onMouseEnterHandler() {
    this.setState({
      hover: true,
    })
  }

  onMouseLeaveHandler() {
    this.setState({
      hover: false,
    })
  }

  isHelpful(num) {
    return (
      <Badge
        badgeContent={num}
        primary={true}
      >
        <SentimentVerySatisfied />
      </Badge>
    );
  }

  isUnhelpful(num) {
    return (
      <Badge
        badgeContent={num}
        primary={true}
      >
        <SentimentVeryDissatisfied />
      </Badge>
    );
  }

  isFavorite(num) {
    return (
      <Badge
        badgeContent={num}
        primary={true}
      >
        <Favorite />
      </Badge>
    );
  }

  isProblem(num) {
    return (
      <Badge
        badgeContent={num}
        primary={true}
      >
        <ReportProblem />
      </Badge>
    )
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
      width: 600,
      margin: 10,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const hoverCardStyle = {
      width: 600,
      margin: 10,
      overflow: 'auto',
      //backgroundColor: '#17FDFC',
    };
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
      lineHeight: 1.1,
      fontFamily: 'Roboto',
      marginRight: 20,
    };
    const mainStyle = this.state.hover ? hoverCardStyle : cardStyle
    let advice = this.props.post.message.slice(0, 200)
    let that = this
    let currentPath = '/' + this.props.post.phase + '/'

    return (
      <div style={center}>
        <div>
          <div style={{ margin: 10 }}>
            <Card
              children={this.isHelpful && this.isUnhelpful}
              style={mainStyle}
              onMouseEnter={that.onMouseEnterHandler}
              onMouseLeave={that.onMouseLeaveHandler}
            >
              <CardHeader
                title={this.renderNameLink()}
                subtitle={this.props.post.anon ? 'Cyberspace' : this.props.post.user.job + ' - ' + this.props.post.user.location}
                avatar={this.renderAvatarLink()}
              />
            <Divider style={{marginTop: -25}}/>
              <Editor
                style={title}
                text={this.props.post.title}
                options={{disableEditing: true, toolbar: false }}
              />
              <Editor
                style={message}
                text={advice}
                options={{disableEditing: true, toolbar: false }}
              />
            <Divider />
              <CardActions>
                <Link to={currentPath + this.props.post.id}>
                  <FlatButton label="Read More" style={{ marginTop: 15 }} />
                </Link>
                <div style={{ float: "right", marginRight: 20, marginTop: 5 }}> {this.isHelpful(this.props.post.helpful)} {this.isUnhelpful(this.props.post.unhelpful)} {this.isFavorite(this.props.post.favorites)} {this.isProblem(this.props.post.flag)}</div>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPreview;
