import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      books: [],
      title: '', //NEW
      author: '', //NEW
      rating: '' //NEW
    }
  }

  componentDidMount = () => {

    fetch('http://localhost:3001/api/v1/books')
      .then(response => response.json())
      .then(books => this.setState({ books }));
  }


  //NEW --START
  create = (e) => {
    // e.prevent.Default();
    fetch("http://localhost:3001/api/v1/books", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        author: this.state.author,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }
  //NEW --END


  render() {
    return (
      //View All Books
      <div className="container">
        <h1>All Books</h1>
        {this.state.books.map((book, index) => 
          <li key={index}>
            <h3>AUTHOR: {book.author} - TITLE: {book.title} - RATING: {book.rating}</h3>
          </li>
        )}
        <hr />
        {/* NEW -- START */}
        <h1>Input Book</h1>
        <label htmlFor="name">
          Author Name:
          <input
            name="author"
            id="author"
            type="text"
            className="form-control"
            value={this.state.author}
            onChange={(e) => this.handleChange ({author: e.target.value})} required />
        </label>
        <button className="btn btn-primary" type="button" onClick={(e) => this.create(e)}>
          Add
        </button> 
        {/* NEW -- END  */}
      </div>
      
    );
  }
}

export default App;
