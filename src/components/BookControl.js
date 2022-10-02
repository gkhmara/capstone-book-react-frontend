import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BookControl = () => {

  const initialState = {
    books: [],
    title: '',
    author: '',
    rating: '',
    id: '',
    search: ''
  }

  const [state, setState] = useState(initialState);

  const getBooks = (sortCriteria) => {
    fetch(`http://localhost:3001/api/v1/books?sort=${sortCriteria}&search=${state.search}`)
    .then(response => response.json())
    .then(books => setState({ ...state, books }));
  };


  useEffect(() => {
    getBooks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  //CREATE -- START
  const create = (e) => {
    // e.prevent.Default();
    fetch(`http://localhost:3001/api/v1/books`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        author: state.author,
        title: state.title,
        rating: state.rating
      })
    })
    .then(response => response.json())
    .then(response => {
      getBooks();
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }
  //CREATE -- END

  //UPDATE -- START
  const update = (e) => {
    fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        _id: state.id,
        author: state.author,
        title: state.title,
        rating:state.rating
      })
    })
    .then(response => response.json())
    .then(response => {
      getBooks();
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }
  //UPDATE --END

  //DELETE --START
  const deleteBook = (e) => {
    fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
      "method": "DELETE",
    })
    .then(response => response.json())
    .then(response => {
      getBooks();
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }
  //DELETE --END --NEW


  //HANDLE CHANGE --START
  const handleChange = (changeObject) => {
    console.log(changeObject);
    setState({...state, ...changeObject});
  }
  //HANDLE CHANGE --END


    let currentlyVisibleState = null;

    const handleSort = (sortName) => {
      getBooks(sortName);
    }

    

    return (
      <>
        {currentlyVisibleState} {/* --NEW => LOOK HERE */}
        {/* View All Books */}

        <div className="container">
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => handleSort("author")}>sort by author</Button>
          <Button variant="contained" onClick={() => handleSort("title")}>sort by title</Button>
          <Button variant="contained" onClick={() => handleSort("rating")}>sort by rating</Button>
        </Stack>
        <input onChange={(e) => handleChange ({search: e.target.value})}/>
        <button onClick={getBooks}>Search</button>

          <h1>All Books</h1>
          {state.books?.map((book, index) => 
            <Link to={`/books/${book.id}`} key={index}>
              <h3>AUTHOR: {book.author} - TITLE: {book.title} - RATING: {book.rating} - ID: {book.id}</h3>
            </Link>
          )}
          <hr />
          <form>
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
                value={state.author}
                onChange={(e) => handleChange ({author: e.target.value})} 
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
                value={state.title}
                onChange={(e) => handleChange ({title: e.target.value})} 
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
                value={state.rating}
                onChange={(e) => handleChange ({rating: e.target.value})} required /> 
            </label>
            {/* ID */}
            <label htmlFor="id">
              Book ID:
              <input
                name="id"
                id="id"
                type="text"
                className="form-control"
                value={state.id}
                onChange={(e) => handleChange({id: e.target.value})}
              />
            </label>
            <button type="button" onClick={(e) => create(e)}>
              Add Book
            </button>
            <button type="button" onClick={(e) => update(e)}>
              Update Book
            </button>
            <button type="button" onClick={(e) => deleteBook(e)}>
              Delete Book
            </button> 
          </form>
        </div>
      </>
    );
}

export default BookControl;