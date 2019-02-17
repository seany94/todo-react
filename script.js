class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.removeHandler = this.removeHandler.bind( this );
    this.editHandler = this.editHandler.bind( this );
    this.editChange = this.editChange.bind( this );
    this.updateHandler = this.updateHandler.bind( this );
    this.doneHandler = this.doneHandler.bind( this );
  }

  state = {
    list : [],
    done : [],
    word : "",
    edit : "",
    update : false,
    new : "",
  }

  changeHandler(event){
    if(event.target.value.length > 9){
        alert("WARNING ERROR!! INPUT TOO LONG!!!")
    }
    this.setState({word: event.target.value});
  }

  clickHandler(event){
    var newArray = this.state.list.slice();
    newArray.push(event.target.value);
    this.setState({word: "", list: newArray});
  }

  removeHandler(event){
    // console.log(this.state.list.includes(event.target.value))
    var element = this.state.list.indexOf(event.target.value)
    if(this.state.list.includes(event.target.value) == true){
        var newArray = this.state.list.slice();
        newArray.splice(element, 1);
        // console.log(newArray)
        this.setState({list: newArray});
    }
    else if(this.state.done.includes(event.target.value) == true){
        var doneArray = this.state.done.slice();
        doneArray.splice(element, 1);
        // console.log(newArray)
        this.setState({done: doneArray});
    }

  }

  editHandler(event){
    // console.log(this.checkClick)
    var element = this.state.list.indexOf(event.target.value)
    this.setState({edit: element, update: true, new: event.target.value});
  }

  editChange(event){
    if(event.target.value.length > 9){
        alert("WARNING ERROR!! INPUT TOO LONG!!!")
    }
    this.setState({new: event.target.value});
  }

  updateHandler(event){
    event.preventDefault();
    var edit = parseInt(this.state.edit);
    var editStr = event.target.value
    // console.log(edit, editStr)
    var oldWord = this.state.list.splice(edit, 1);
    var newArray = this.state.list.slice();
    newArray.push(editStr)
    // console.log(this)
    this.setState({update: false, list: newArray});
    this.todoTextElem.value = '';
  }

  doneHandler(event){
    var element = this.state.list.indexOf(event.target.value)
    var newArray = this.state.list.slice();
    newArray.splice(element, 1);
    var doneArray = this.state.done.slice();
    doneArray.push(event.target.value);
    this.setState({list: newArray, done: doneArray});
  }

  render() {
      // render the list with a map() here
      const todo = this.state.list.map(item => {return <Item items={item} remove={this.removeHandler} edit={this.editHandler} done={this.doneHandler}></Item>})
      const doneList = this.state.done.map(item => {return <Item items={item} remove={this.removeHandler}></Item>})
      var wordCount = 10 - this.state.word.length
      if(this.state.update === false){
        return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word} maxlength="10"/>
          <button onClick={this.clickHandler} value={this.state.word}>add item</button>
          <p>Characters left: {wordCount}</p>
          Ongoing List
          <ul>
            {todo}
          </ul>
          Done List
          <ul>
            {doneList}
          </ul>
        </div>
      );
      }
      else{
        return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word} maxlength="10"/>
          <button onClick={this.clickHandler} value={this.state.word}>add item</button>
          <p>Characters left: {wordCount}</p>
          <input onChange={this.editChange} value={this.state.new} ref={el => this.todoTextElem = el} maxlength="10"/>
          <button onClick={this.updateHandler} value={this.state.new}>update</button>
          <br/>
          Ongoing List
          <ul>
            {todo}
          </ul>
          Done List
          <ul>
            {doneList}
          </ul>
        </div>
      );
      }
  }
}

class Item extends React.Component{
    render() {
    return (
        <li>{this.props.items} <button onClick={this.props.remove} value={this.props.items}>remove item</button> <button onClick={this.props.edit} value={this.props.items}>edit item</button> <button onClick={this.props.done} value={this.props.items}>mark done</button></li>
      );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);