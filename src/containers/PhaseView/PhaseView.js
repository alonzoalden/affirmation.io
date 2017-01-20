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
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from 'material-ui/LinearProgress';

class PhaseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      currentPosts: [],
      postIndexStart: 0,
      hasMoreItems: true,
    }
  }

  loadItems(page) {
    if (this.state.allPosts.length === 0) {
      let phase = this.props.location.pathname.toLowerCase()
      return axios.get('/api/posts' + phase)
        .then((arr) => {
          if (arr.data.length === 0) {
            this.setState({
              hasMoreItems: false
            })
          } else {
            arr.data.sort((a,b) => {
              return (a.sentiment < b.sentiment) ? 1 : -1
            })
            this.setState({
              allPosts: arr.data,
              currentPosts: [],
            })
          }
        })
      } else {
        let postSection = this.state.allPosts.slice(this.state.postIndexStart, (this.state.postIndexStart+5))

        let posts = this.state.currentPosts
        postSection.map((post, index) => {
          posts.push(post)
        })

        this.setState({
          currentPosts: posts,
          postIndexStart: this.state.postIndexStart +5,
        })

        if (this.state.postIndexStart >= this.state.allPosts.length) {
          this.setState({
            hasMoreItems: false,
          })
        }
      }
  }

  render() {

    const loader = <div><LinearProgress mode="indeterminate" color="#0093FF" /></div>
    let itemViews = []
    if (this.state.currentPosts.length > 0) {
      this.state.currentPosts.map((post) => {
        itemViews.push( <div><PostPreview post={post} /></div> )
      })
    }

      return (
          <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems.bind(this, this.state.postIndexStart)}
              hasMore={this.state.hasMoreItems}
              loader={loader}>

              {itemViews}

          </InfiniteScroll>
      );
  }
}

export default PhaseView;
