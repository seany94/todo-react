class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
  }

  state = {
    list : [],
    word : ""
  }

  changeHandler(event){
    if(event.target.value.length > 9){
        alert("WARNING ERROR!! INPUT TOO LONG!!!")
    }
    this.setState({word:event.target.value});
  }

  clickHandler(event){
    var newArray = this.state.list.slice();
    newArray.push(event.target.value);
    this.setState({word: "", list: newArray});
  }

  render() {
      // render the list with a map() here
      const todo = this.state.list.map(item => {return <li>{item}</li>})
      console.log(this.state.word.length)
      var wordCount = 10 - this.state.word.length
      return (
        <div className="list">
          <input onChange={this.changeHandler} value={this.state.word} maxlength="10"/>
          <button onClick={this.clickHandler} value={this.state.word}>add item</button>
          <p>Characters left: {wordCount}</p>
          <ul>
            {todo}
          </ul>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);