import React, { Component } from "react";

import Alert from './Alert'; 

class App extends Component { //parent component
  constructor(props) {
    super(props);

    this.state = {
      text:'',
      priority:'0',
      todos: [],    
    };

    this.count = 0;
    this.handleText = this.handleText.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.handleTodo = this.handleTodo.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleText(e) {
    this.setState({ text: e.target.value });
  }

  handlePriority(e) {
    this.setState({ priority: e.target.value });
  }

  handleSave(id, text, priority) {
    console.log('console log', id, text, priority)
      var newState = this.state.todos.slice(); //creates copy of array of todos 
      console.log('slice method test', newState); 
      
        var indexId = newState.findIndex((todoCurrentValue) => todoCurrentValue.id === id);
        //matching the original todo id with the edited todo id
        console.log('indexId console log', indexId)
        console.log(this.state.todos[indexId]);

         newState[indexId] = {id: id, text: text, priority: priority}; 
         this.setState({todos: newState});

      //todoCurrentValue is each individual todo in the todos array. 
      //newState variable is the sliced todos array that is a copy of the original  
  }  

  handleDelete(id){
    var deleteState = this.state.todos.slice();

    var deleteIndexId = deleteState.findIndex((todoCurrentValue) => todoCurrentValue.id === id); 

    deleteState.splice(deleteIndexId, 1);
    this.setState({todos: deleteState});
  }

  handleTodo(e) {
    e.preventDefault();
    if (this.state.priority === '0') {
      return false;
    }

    const userText = this.state.text;
    const userPriority = this.state.priority;
    const todos = this.state.todos;

    todos.push({
      id: this.count++,
      text: userText,
      priority: userPriority,
      editEnable: false 
    });

    this.setState({
      todos:todos 
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Very Simple Todo App</h1>
          <p>Track all of the things</p>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">Enter Information</div>
                <div className="card-body">
                  <div>
                    <form onSubmit={this.handleTodo}>
                      <div className="form-group">
                        <label htmlFor="textArea">I want to...</label>
                        <textarea
                          className="form-control create-todo-text" 
                          id="textArea"
                          rows="3"
                          onChange={this.handleText}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                          How much of a priority is this?!
                        </label>
                        <select
                          className="mt-2 mb-4 form-control create-todo-priority"
                          id="exampleFormControlSelect1"
                          onChange={this.handlePriority} 
                          defaultValue={this.state}
                        >
                          <option value="0" name="priority">Select Priority</option>  
                          <option value="high" name="priority">high</option>
                          <option value="medium" name="priority">medium</option>
                          <option value="low" name="priority">low</option>
                        </select>
                      </div>
                    
                      <button
                        type="submit"
                        className="btn btn-primary btn-block create-todo"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">View Todos!</div>
                <div className="card-body" />
                <div className="container">
                  {this.state.todos.map((todo, index) => {
                    //console.log(index);
                    return <Alert
                      todo={todo}
                      key={index}
                      onSave={this.handleSave} 
                      onDelete={this.handleDelete}
                      //these are all props that are being rendered in alert
                    />
                    //are we going to put the id of the todo in this function?
                  })
                  }
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
