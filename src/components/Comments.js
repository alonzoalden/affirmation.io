var React = require('react');
var ReactDisqusThread = require('react-disqus-thread');

class DisqusComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewComment(comment) {
    console.log(comment.text); // Logs comment string to console
  }

  componentWillMount() {
    console.log('PROPS IN DISQUS:', this.props);
  }

  // url="http://lotus-affirmation.herokuapp.com/"
  render() {
    return (
      <ReactDisqusThread
        shortname="affirmation"
        identifier={this.props.post}
        title={this.props.postTitle}
        url={this.props.postUrl}
        onNewComment={this.handleNewComment}
      />
    );
  }
}

export default DisqusComments;
