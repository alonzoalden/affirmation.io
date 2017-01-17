var React = require('react');
var ReactDisqusThread = require('react-disqus-thread');

class DisqusComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewComment(comment) {
    console.log(comment.text);
  }

  componentWillMount() {
    console.log('PROPS IN DISQUS:', this.props);
  }

  render() {
    return (
      <ReactDisqusThread
        shortname="affirmation"
        identifier={this.props.post}
        title="PostView"
        url="http://lotus-affirmation.herokuapp.com/"
        onNewComment={this.handleNewComment}
      />
    );
  }
}

export default DisqusComments;
