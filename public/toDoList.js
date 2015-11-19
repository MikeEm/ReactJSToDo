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
    
    handleTodoSubmit: function(todo) {
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: todo,
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
    
    var todoListNodes = this.state.data.map(function(todoList) {
           return(
            <TodoList data={todoList.tasks}>
            <h2>{todoList.todoListName}</h2>
            </TodoList>
            );
        });    
        
    return(
        <div className="todoBox">
        <h1> To Do List : </h1>
        {todoListNodes}
        <br/>
        <TodoListForm onTodoSubmit={this.handleTodoSubmit}/>
        </div>
    );    
  }
});

var TodoList = React.createClass({
  render: function(){
    var todoNodes = this.props.data.map(function(todo){
        return(
            <Todo key={todo.id}>{todo.task}</Todo>
        );
    });
    return(
        <div className="todoList">
        <h3>{this.props.children}</h3>
            {todoNodes}
        <TodoForm/>
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
   handleSubmit: function(e) {
    e.preventDefault();
    var task = this.refs.task.value.trim();
    if (!task) {
      return;
    }
    // TODO: send request to the server
    this.props.onTodoSubmit({task: task});
    this.refs.task.value = '';
    return;
  },
    render: function(){
    return(
        <form className="TodoForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Add a new task" ref="task"/>
            <input type="submit" value="Add Task"/>
        </form>
        );
   }
});

var TodoListForm = React.createClass({
   render: function(){
    return(
        <form className="TodoListForm" >
            <input type="text" placeholder="Name your new List" ref="task"/>
            <input type="submit" value="Create List"/>
        </form>
        );
   }
});


var dataPassed = [
    { "id": 1, "task": "Wake up", "isChecked": true},
    { "id": 2, "task": "Fall out of bed", "isChecked": true},
    { "id": 3, "task": "Drag a comb across my head", "isChecked": false}
];

ReactDOM.render(
    <TodoBox url="todos.json" pollInterval={2000}/>,
    //<TodoBox data={dataPassed}/>,
  document.getElementById('content')
);