import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: false,
      text:'',
      priority: ''
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleEditTodoPriority = this.handleEditTodoPriority.bind(this);
    this.handleSave = this.handleSave.bind(this);
    
    // this.handleEditPriority = this.handleEditPriority.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleSave = this.handleSave.bind(this);
  }

  handleEdit(e) {
    this.setState({ editEnabled: true });
  }


  handleEditTodo(e){
    // const newPriorityState = this.state //what are we going to do with these variables with the state?
    // const newTextState = this.state
    this.setState({ text: e.target.value });
  }

  handleEditTodoPriority(e) {
    this.setState({ priority: e.target.value });
  }
  
  handleSave(e){
    //console.log('hello from aler.handlesave')
 //newPriorityState and newTextState? need to update state of the original todo 
    this.props.onSave(this.props.todo.id, this.state.text, this.state.priority);
    this.setState({editEnabled: false})
  }
  //save needs to update the state of the original todo by using the ID 

  //edit will change in this state but not the state of our parent component so we need to change
  //the todo by selecting an ID?

  //FOR LATER



  // handleDelet(e) {
  //   this.setState({ delete: e.target.value });
  // }



  render() {
    let priority;
    if (this.props.todo.priority == "medium") {
      priority = "alert-warning";
    } else if (this.props.todo.priority == "high") {
      priority = "alert-danger";
    } else {
      priority = "alert-success";
    }
    
    if (this.state.editEnabled === true){
      return (
        <div className={`alert ${priority}`} role="alert" >
          <label htmlFor="textArea">Description</label> 
          <textarea //should this be in the same alert with edit/delete or in new one?
            className="update-todo-text" //used to say form-control before
            id="textArea"
            rows="3" 
            defaultValue={this.props.todo.text} //defaultvale lets you change the value 
            onChange={this.handleEditTodo}
          />
          <div className="form-group">
           <label htmlFor="exampleFormControlSelect1">
            How much of a priority is this?!
            </label>
            <select
              className="mt-2 mb-4 form-control"
              id="exampleFormControlSelect1"
              onChange={this.handleEditTodoPriority} 
                >
              <option defaultValue="0" name="priority">Select Priority</option>  
              <option defaultValue="high" name="priority">high</option>
              <option defaultValue="medium" name="priority">medium</option>
              <option defaultValue="low" name="priority">low</option>
            </select>
          </div>
          <button
            onClick={this.handleSave}
            type="submit"
            className="btn btn-primary btn-block">
            Save
          </button>
        </div>
      ) //make a save button that handles the change for the text area and priority
    }

    return (
      <div> 
        <div className={`alert ${priority}`} role="alert" id="success">
          <p>
            <input type="checkbox" />
            {this.props.todo.text}
            <button onClick={this.handleEdit} className="mx-2 btn btn-primary" role="button">
              Edit
            </button>
            <button className="btn btn-primary" role="button">
              Delete
            </button>
          </p>
       </div>
      </div>
    );
  }
}

export default Alert;

// const alert = this.state.priority
