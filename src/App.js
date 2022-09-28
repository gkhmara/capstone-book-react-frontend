import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      books: []
    }
  }

  componentDidMount() {

    fetch('http://localhost:3001/api/v1/books')
      .then(response => response.json())
      .then(books => this.setState({ books }));
  }

  render() {
    return (
      <div>
      {this.state.books.map((book, index) => 
        <li key={index}>
          <h3>{book.author}</h3>
          <h3>{book.title}</h3>
          <h3>{book.rating}</h3>
        </li>
      )}
      </div>
    );
  }
}

export default App;
