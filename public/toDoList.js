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
    
    handleTodoListSubmit: function(todo) {
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
            <TodoList data={todoList.tasks} key={todoList.id}>
            <h2>{todoList.todoListName}</h2>
            </TodoList>
            );
        });    
        
    return(
        <div className="todoBox">
        <h1> To Do List : </h1>
        {todoListNodes}
        <br/>
        <TodoListForm onTodoListSubmit={this.handleTodoListSubmit}/>
        </div>
    );    
  }
});

var TodoList = React.createClass({
    handleTaskSubmit: function(task) {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'PUT',
          data: task,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    
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
        <TodoForm onTaskSubmit={this.handleTaskSubmit}/>
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
    getInitialState: function() {
        return {todoListName: '{this.props.todoListName}', task: ''};
    },
    handleTaskChange: function(e) {
        this.setState({"task": e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var task = this.state.task.trim();
        if (!task) {
          return;
        }
        this.props.onTaskSubmit({task: task});
        this.setState({"task": ''});
    },
    
    
    render: function(){
    return(
        <form className="TodoForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Add a new task" value={this.state.task} onChange={this.handleTaskChange}/>
            <input type="submit" value="Add Task"/>
        </form>
        );
   }
});

var TodoListForm = React.createClass({
    getInitialState: function() {
        return {todoListName: ''};
    },
    handleTodoListNameChange: function(e) {
        this.setState({"todoListName": e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var todoListName = this.state.todoListName.trim();
        if (!todoListName) {
          return;
        }
        this.props.onTodoListSubmit({todoListName: todoListName});
        this.setState({"todoListName": ''});
    },
    
   render: function(){
    return(
        <form className="todoListForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name your List" value={this.state.todoListName} onChange={this.handleTodoListNameChange}/>
            <input type="submit" value="Create List"/>
        </form>
    );
   }
});

/*var fs = require("fs");*/

ReactDOM.render(
    <TodoBox url="api/todos" pollInterval={20000}/>,
    //<TodoBox data={dataPassed}/>,
  document.getElementById('content')
);