var TodoBox = React.createClass({
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
    { id: 1, thingToDo: "Wake up"},
    { id: 2, thingToDo: "Fall out of bed"},
    { id: 3, thingToDo: "Drag a comb across my head"}
];

ReactDOM.render(
  <TodoBox data={dataPassed}/>,
  document.getElementById('content')
);