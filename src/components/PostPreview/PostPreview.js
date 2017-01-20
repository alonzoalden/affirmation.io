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
import '../FlatEditor.css';
import Avatar from 'material-ui/Avatar';
import WhiteLotus from '../../icons/white_lotus.png';

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
        badgeStyle={{backgroundColor: '#867dcc', color: '#fff'}}
      >
        <SentimentVerySatisfied />
      </Badge>
    );
  }

  isUnhelpful(num) {
    return (
      <Badge
        badgeContent={num}
        badgeStyle={{backgroundColor: '#867dcc', color: '#fff'}}
      >
        <SentimentVeryDissatisfied />
      </Badge>
    );
  }

  isFavorite(num) {
    return (
      <Badge
        badgeContent={num}
        badgeStyle={{backgroundColor: '#867dcc', color: '#fff'}}
      >
        <Favorite />
      </Badge>
    );
  }

  isProblem(num) {
    return (
      <Badge
        badgeContent={num}
        badgeStyle={{backgroundColor: '#867dcc', color: '#fff'}}
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
        <Link style={{textDecoration: 'none', color: 'black'}} to={`/profile/${window.btoa(this.props.post.user.email)}`}>{this.props.post.user.name}</Link>
      );
    }
  }

  renderAvatarLink() {
    if (this.props.post.anon) {
      return (
        <Avatar size={60} src={WhiteLotus} />
      );
    } else {
      return (
        <Link to={`/profile/${window.btoa(this.props.post.user.email)}`}>
          <Avatar size={60} src={this.props.post.user.avatar} />
        </Link>
      );
    }
  }

  render() {
    const cardStyle = {
      width: 600,
      margin: 10,
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const headCenter = {
      display: 'flex',
      alignItems: 'center',
    };
    const hoverCardStyle = {
      width: 600,
      margin: 10,
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
    const titleStyles = {
      marginTop: 12,
      padding: 0
    };
    const subtitleStyles = {
      padding: 0
    };
    const cardHeader = {
      paddingTop: 10,
      marginBottom: -15
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
            <div style={headCenter}>
              <CardHeader
                style={cardHeader}
                titleStyle={titleStyles}
                titleColor="#000000"
                subtitleStyle={subtitleStyles}
                subtitleColor="#000000"
                title={this.renderNameLink()}
                subtitle={this.props.post.anon ? 'Affirmation Alliance' : this.props.post.user.job}
                avatar={this.renderAvatarLink()}
              />
            </div>
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
              <CardActions style={{ paddingBottom: 18 }}>
                <Link to={currentPath + this.props.post.id}>
                  <FlatButton
                    label="Read More"
                    style={{ marginTop: 10, marginLeft: 10 }}
                    hoverColor="#867dcc"
                  />
                </Link>
                <div style={{ float: "right", marginRight: 20, marginTop: 5 }}> {this.isFavorite(this.props.post.favorites)}{this.isHelpful(this.props.post.helpful)} {this.isUnhelpful(this.props.post.unhelpful)}</div>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPreview;
