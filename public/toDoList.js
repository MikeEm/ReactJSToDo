var TodoBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    //Sets up initial state of the component
    getInitialState: function() {
        return {data: []};
    },
    
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    
    //Have to make it work with {this.state.data}
    render: function(){
    return(
        <div className="todoBox">
        <h1> To Do List : </h1>
        <TodoList data={this.props.data}/>
        <TodoForm/>
        </div>
    );    
  }
});

var TodoList = React.createClass({
  render: function(){
    var todoNodes = this.props.data.map(function(todo){
        return(
            <Todo>{todo.thingToDo}</Todo>
        );
    });
    return(
        <div className="todoList">
            {todoNodes}
        </div>
    );
  }
});

var Todo = React.createClass ({
    rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
    
    render: function(){
    return(
        <div className="todo">    
        <input type="checkbox"/> 
        {this.props.children}
        </div>
    );
   }
});

var TodoForm = React.createClass({
   render: function(){
    return(
        <div className="TodoForm">
        Here will be the TodoForm
        </div>
        );
   }
});

var dataPassed = [
    { id: 1, thingToDo: "Wake up", isChecked: true},
    { id: 2, thingToDo: "Fall out of bed", isChecked: true},
    { id: 3, thingToDo: "Drag a comb across my head", isChecked: false}
];

ReactDOM.render(
  <TodoBox data={dataPassed}/>,
  document.getElementById('content')
);