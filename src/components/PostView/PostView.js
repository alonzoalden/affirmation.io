/**
*
* PostView
*
*/
import React from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    this.getCurrentPost();
  }

  getCurrentPost() {
    let path = window.location.pathname.toLowerCase();
    console.log(path);
    return axios.get('http://localhost:8000/api/posts' + path)
      .then((post) => {
        console.log(post);
        this.setState({ post: post.data })
      });
  }

  isHelpful() {

  }
  isUnhelpful() {

  }
  render() {
    const cardStyle = {
      width: 600,
      margin: 20,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div>
        <div style={center}>
          <div style={{ margin: 20 }}>
            <Card
              style={cardStyle}
            >
              <CardHeader
                title={this.state.post.anon ? 'Anonymous' : this.state.post.user.name}
                subtitle="Hack Reactor - San Francisco, CA"
                avatar={this.state.post.user.avatar}
              />
            <CardTitle titleStyle={{ 'text-align': 'center' }} title={this.state.post.title} />
              <CardText>
                {this.state.post.message}
              </CardText>
              <CardActions>
                <FlatButton label="Is Helpful" />
                  <Badge
                    badgeContent={this.state.post.helpful}
                    primary={true}
                  >
                    <SentimentVerySatisfied />
                  </Badge>
                <FlatButton label="Is Unhelpful" />
                  <Badge
                    badgeContent={this.state.post.unhelpful}
                    primary={true}
                  >
                    <SentimentVeryDissatisfied />
                  </Badge>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default PostView;
