class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.removeHandler = this.removeHandler.bind( this );
    this.editHandler = this.editHandler.bind( this );
    this.editChange = this.editChange.bind( this );
    this.updateHandler = this.updateHandler.bind( this );
  }

  state = {
    list : [],
    word : "",
    edit: "",
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
    // console.log(this.state.list.indexOf(event.target.value))
    var element = this.state.list.indexOf(event.target.value)
    var newArray = this.state.list.slice();
    newArray.splice(element, 1);
    // console.log(newArray)
    this.setState({word: "", list: newArray});
  }

  editHandler(event){
    // console.log(this.state.new)
    var element = this.state.list.indexOf(event.target.value)
    this.setState({edit: element, new: event.target.value});
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
    this.setState({list: newArray});
    this.todoTextElem.value = '';
  }

  render() {
      // render the list with a map() here
      const todo = this.state.list.map(item => {return <Item items={item} remove={this.removeHandler} edit={this.editHandler}></Item>})
      var wordCount = 10 - this.state.word.length
      return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word} maxlength="10"/>
          <button onClick={this.clickHandler} value={this.state.word}>add item</button>
          <p>Characters left: {wordCount}</p>
          <input onChange={this.editChange} value={this.state.new} ref={el => this.todoTextElem = el} maxlength="10"/>
          <button onClick={this.updateHandler} value={this.state.new}>update</button>
          <ul>
            {todo}
          </ul>
        </div>
      );
  }
}

class Item extends React.Component{
    render() {

    return (
        <li>{this.props.items} <button onClick={this.props.remove} value={this.props.items}>remove item</button> <button onClick={this.props.edit} value={this.props.items}>edit item</button></li>
      );
    }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);