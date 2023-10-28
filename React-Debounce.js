import React from 'react'

class App extends React.PureComponent {
  state = {
    name: 'Zeeshan',
    todo: [],
    filteredTodo: [],
    query: '',
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((resp) => {
        return resp.json()
      })
      .then((jsonResponse) => {
        this.setState({
          todo: jsonResponse,
          filteredTodo: jsonResponse,
        })
      })
  }

  debounceTodoSearch(func, delay) {
    let timer
    return function () {
      let context = this
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  }
  seachTodo = (val) => {
    let todoTemp = [...this.state.todo]
    let todos = todoTemp.filter((eachTodo) => eachTodo?.title.includes(val))
    this.setState({
      filteredTodo: todos,
    })
  }

  handleSearch = (event) => {
    let val = event?.target?.value
    this.setState({
      query: val,
    })
    this.debounceTodoSearch(this.seachTodo, 5000)(val)
  }

  render() {
    return (
      <>
        <div>
          Seach Todo
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleSearch}
          />
        </div>
        <div>List of Todo's</div>
        <ul>
          {this.state.filteredTodo?.map((eachTodo) => {
            return <li key={eachTodo.id}>{eachTodo.title}</li>
          })}
        </ul>
      </>
    )
  }
}

export default App
