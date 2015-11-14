var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! This is a CommentBox!
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);