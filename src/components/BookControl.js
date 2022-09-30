import React from 'react';

class BookControl extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      books: [],
      title: '',
      author: '',
      rating: '',
      id: ''
    }
  }

  componentDidMount = () => {

    fetch(`http://localhost:3001/api/v1/books`)
      .then(response => response.json())
      .then(books => this.setState({ books }));
  }


  //CREATE -- START
  create = (e) => {
    // e.prevent.Default();
    fetch(`http://localhost:3001/api/v1/books`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        author: this.state.author,
        title: this.state.title,
        rating: this.state.rating
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
  //CREATE -- END

  //UPDATE -- START
  update(e) {
    fetch(`http://localhost:3001/api/v1/books/${this.state.id}`, {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        _id: this.state.id,
        author: this.state.author,
        title: this.state.title,
        rating:this.state.rating
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
  //UPDATE --END

  //DELETE --START
  delete(e) {
    fetch(`http://localhost:3001/api/v1/books/${this.state.id}`, {
      "method": "DELETE",
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }
  //DELETE --END --NEW


  //HANDLE CHANGE --START
  handleChange(changeObject) {
    this.setState(changeObject)
  }
  //HANDLE CHANGE --END


  render() {
    return (
      //View All Books
      <div className="container">
        <h1>All Books</h1>
        {this.state.books.map((book, index) => 
          <li key={index}>
            <h3>AUTHOR: {book.author} - TITLE: {book.title} - RATING: {book.rating} - ID: {book.id}</h3>
          </li>
        )}
        <hr />
        <form className="d-flex flex-column">
          <legend className="text-center">Add-Update-Delete Book</legend>
          <h1>Input Book</h1>
          {/* AUTHOR */}
          <label htmlFor="author">
            Author Name:
            <input
              name="author"
              id="author"
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={(e) => this.handleChange ({author: e.target.value})} 
              required
            />
          </label>
          {/* TITLE */}
          <label htmlFor="title">
            Title:
            <input
              name="title"
              id="title"
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={(e) => this.handleChange ({title: e.target.value})} 
              required 
            />
          </label>
          {/* RATING */}
          <label htmlFor="rating">
            Rating:
            <input
              name="rating"
              id="rating"
              type="text"
              className="form-control"
              value={this.state.rating}
              onChange={(e) => this.handleChange ({rating: e.target.value})} required /> 
          </label>
          {/* ID */}
          <label htmlFor="id">
            Book ID:
            <input
              name="id"
              id="id"
              type="text"
              className="form-control"
              value={this.state.id}
              onChange={(e) => this.handleChange({id: e.target.value})}
            />
          </label>
          <button className="btn btn-primary" type="button" onClick={(e) => this.create(e)}>
            Add Book
          </button>
          <button className="btn btn-info" type="button" onClick={(e) => this.update(e)}>
            Update Book
          </button>
          <button className="btn btn-danger" type="button" onClick={(e) => this.delete(e)}>
            Delete Book
          </button> 
        </form>
      </div>
      
    );
  }
}

export default BookControl;