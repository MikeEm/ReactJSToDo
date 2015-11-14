var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList/>
        <CommentForm/>
      </div>
    );
  }
});

var CommentList = React.createClass({
    render: function(){
        return(
            <div className = "commentList">
            <Comment author="Mr. California">I am the King Lizard</Comment>
            <Comment author="Ron Swanson">I do what I want</Comment>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function(){
        return(
            <div className = "commentForm">
            This is a Comment form!
            </div>
        );
    }
});

var Comment = React.createClass({
   render: function(){
    return(
        <div className="comment">
            <h2 className="commentAuthor">Author</h2>
            {this.props.author}
            <h2>Comment</h2>
            {this.props.children}
        </div>
    );
   }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);