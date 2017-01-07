/**
*
* PostPreview
*
*/

import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

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

  render() {
    const cardStyle = {
      width: 600,
      margin: 10,
      overflow: 'auto',
    };
    const center = {
      backgroundColor: '#28E498',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const hoverCardStyle = {
      width: 600,
      margin: 10,
      overflow: 'auto',
      backgroundColor: 'lightgrey',
    };
    const mainStyle = this.state.hover ? hoverCardStyle : cardStyle

    let italicMessage = this.props.post.message.slice(0, 20)
    let message = this.props.post.message.slice(20, 200) + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    let that = this
    let currentPath = this.props.location.pathname + '/'

    return (
      <div style={center}>
        <div>
          <div
            style={{ margin: 10 }}
          >
            <Card
              children={this.isHelpful, this.isUnhelpful}
              style={mainStyle}
              onMouseEnter={that.onMouseEnterHandler}
              onMouseLeave={that.onMouseLeaveHandler}
            >
              <CardHeader
                title={this.props.post.anon ? 'Anonymous' : this.props.post.name}
                subtitle="Hack Reactor - San Francisco, CA"
                avatar={this.props.post.anon ? "https://s-media-cache-ak0.pinimg.com/564x/4d/b7/b7/4db7b7ecb39c4eebc5b8f5358773e4a2.jpg" : this.props.post.avatar}
              />
              <CardTitle title={this.props.post.title} />
              <CardText>
                <p><i><strong>{italicMessage}</strong></i>{message} ..... <a href={currentPath + this.props.post.id}>Read more</a></p>
              </CardText>
              <div style={{ float: "right", marginRight: 20 }}> {this.isHelpful(this.props.post.sentiment)} {this.isUnhelpful(this.props.post.unhelpful)} </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPreview;
