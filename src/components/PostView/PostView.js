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
    //unclicking helpful
    if (this.props.sentiment.length === 1) {
      if (this.props.sentiment[0].helpfulness) {  //<--- addresses the true property
        return axios.put('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/null', {
          email: this.props.post.user.email,
          helpful: this.props.post.helpful - 1,
          unhelpful: this.props.post.unhelpful,
          sentiment: this.props.post.sentiment - 1,
        })

      } else { //<--- addresses the false property
       //change their last vote from false to true
        return axios.put('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/helpful', {
          email: this.props.post.user.email,
          helpful: this.props.post.helpful + 1,
          unhelpful: this.props.post.unhelpful - 1,
          sentiment: this.props.post.sentiment + 2,
          helpfulness: true,
        })
      }
    } else { //<---- clicking helpful the first time
      return axios.post('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/helpful', {
        email: this.props.post.user.email,
        sentiment: this.props.post.sentiment + 1,
        helpful: this.props.post.helpful + 1,
      })
    }
  }

  isUnhelpful() {
    //unclicking helpful
    if (this.props.sentiment.length === 1) {
      if (this.props.sentiment[0].helpfulness) {  //<--- addresses the true property
        return axios.put('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/null', {
          email: this.props.post.user.email,
          helpful: this.props.post.helpful,
          unhelpful: this.props.post.unhelpful - 1,
          sentiment: this.props.post.sentiment + 1,
        })

      } else { //<--- addresses the false property
       //change their last vote from false to true
        return axios.put('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/unhelpful', {
          email: this.props.post.user.email,
          helpful: this.props.post.helpful - 1,
          unhelpful: this.props.post.unhelpful + 1,
          sentiment: this.props.post.sentiment - 2,
          helpfulness: false,
        })
      }
    } else { //<---- clicking unhelpful the first time
      return axios.post('http://localhost:8000/api/posts' + this.props.post.phase + '/vote/unhelpful', {
        email: this.props.post.user.email,
        sentiment: this.props.post.sentiment - 1,
        unhelpful: this.props.post.unhelpful + 1,
      })
    }
  }

  favorite() {

  }

  flag() {

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
