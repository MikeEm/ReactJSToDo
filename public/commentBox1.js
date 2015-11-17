var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data}/>
        <CommentForm/>
      </div>
    );
  }
});

var CommentList = React.createClass({
    render: function(){
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return(
            <div className = "commentList">
            <Comment author="Rick Sanchez">I always wanted to know how... plumbuses were made</Comment>
            {commentNodes}
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
   rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
    
    render: function(){
    return(
        <div className="comment">
            <h2 className="commentAuthor">Author</h2>
            {this.props.author}
            <h2>Comment</h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
    );
   }
});

var dataPassed = [
    { id: 1, author: "Robert California", text: "I am the *Lizard* King"},
    { id: 2, author: "Ron Swanson", text: "I do whar I want"}
    
];

ReactDOM.render(
  <CommentBox data={dataPassed}/>,
  document.getElementById('content')
);