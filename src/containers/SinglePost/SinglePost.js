/*
 *
 * SinglePost
 *
 */

import React from 'react';
import PostView from '../../components/PostView/PostView';
import axios from 'axios';

export class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    }
  }

  componentWillMount() {
    this.getCurrentPost();
  }

  getCurrentPost() {
    let path = this.props.location.pathname.toLowerCase();
    return axios.get('http://localhost:8000/api/posts' + path)
      .then((post) => {
        this.setState({ post: post.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  render() {
    return (
      <div>
        {this.state.post.map((post, index) => {
          return (
            <div>
              <PostView
                post={post}
              />
            </div>
          );
        })};
      </div>
    )
  }
}

export default SinglePost;
