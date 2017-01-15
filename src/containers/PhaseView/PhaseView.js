/**
*
* PhaseView
*
*/

import React from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import PostPreview from '../../components/PostPreview/PostPreview';
// import InfiniteScroll from 'react-infinite-scroller';

class PhaseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.getPreviewPosts();
  }

  getPreviewPosts() {
    let phase = this.props.location.pathname.toLowerCase()
    return axios.get('/api/posts' + phase)
      .then((arr) => {
          arr.data.sort((a,b) => {
            return (a.sentiment < b.sentiment) ? 1 : -1
          })
          this.setState({ posts: arr.data })
      })
  }

  render() {

    const loader = <div className="loader">Loading ...</div>

    return (
      <div>
        {this.state.posts.map((post, index) => {
          return (
            <div>
              <PostPreview
                post={post}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default PhaseView;
