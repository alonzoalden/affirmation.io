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

    }
  }

  isHelpful() {
    let touched;
    // if helpful has been pressed
    if( touched ) {
      // set helpful to false
      touched = false;
      return axios.put()
      // decrement by 1
    }
    // else, set helpful to true
      // increment by 1

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
                title={this.props.post.anon ? 'Anonymous' : this.props.post.user.name}
                subtitle={this.props.post.user.job + ' - ' + this.props.post.user.location}
                avatar={this.props.post.user.avatar}
              />
            <CardTitle titleStyle={{ 'text-align': 'center' }} title={this.props.post.title} />
              <CardText>
                {this.props.post.message}
              </CardText>
              <CardActions>
                <FlatButton label="Is Helpful" />
                  <Badge
                    badgeContent={this.props.post.helpful}
                    primary={true}
                  >
                    <SentimentVerySatisfied />
                  </Badge>
                <FlatButton label="Is Unhelpful" />
                  <Badge
                    badgeContent={this.props.post.unhelpful}
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
