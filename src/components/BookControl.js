import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

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
  // const update = (e) => {
  //   fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
  //     "method": "PUT",
  //     "headers": {
  //       "content-type": "application/json",
  //       "accept": "application/json"
  //     },
  //     "body": JSON.stringify({
  //       _id: state.id,
  //       author: state.author,
  //       title: state.title,
  //       rating:state.rating
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     getBooks();
  //     console.log(response)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }
  //UPDATE --END

  //DELETE --START
  // const deleteBook = (e) => {
  //   fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
  //     "method": "DELETE",
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     getBooks();
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => handleSort("author")}>sort by author</Button>
            <Button onClick={() => handleSort("title")}>sort by title</Button>
            <Button onClick={() => handleSort("rating")}>sort by rating</Button>
          </ButtonGroup>
          
          <Stack spacing={2} direction='row'>
          <TextField id="outlined-basic" label="Search by Author" variant="outlined" 
            onChange={(e) => handleChange ({search: e.target.value})}
          />
          {/* <input onChange={(e) => handleChange ({search: e.target.value})}/> */}
          <Button variant="contained" onClick={getBooks}>Search by Author</Button>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
            <h1>All Books</h1>
            {state.books?.map((book, index) => 
              <Link to={`/books/${book.id}`} key={index}>
                <h2>{book.title}</h2>
                <h3>by {book.author}</h3>
                <h4>{book.rating}/10</h4>
                {/* <hr /> */}
                {/* <h3>AUTHOR: {book.author} - TITLE: {book.title} - RATING: {book.rating} - ID: {book.id}</h3> */}
              </Link>
            )}
            <hr />
            <form>
              {/* <legend>Add-Update-Delete Book</legend> */}
              <h1>Input Book</h1>
              <Stack spacing={2} direction='row'>
                {/* AUTHOR */}
                <label htmlFor="author">
                  {/* Author Name: */}
                  <TextField id="outlined-basic" label="Author" variant="outlined"
                    name="author"
                    // id="author"
                    type="text"
                    className="form-control"
                    value={state.author}
                    onChange={(e) => handleChange ({author: e.target.value})} 
                    required
                  />
                </label>
                {/* TITLE */}
                <label htmlFor="title">
                  {/* Title: */}
                  <TextField id="outlined-basic" label="Title" variant="outlined"
                    name="title"
                    // id="title"
                    type="text"
                    className="form-control"
                    value={state.title}
                    onChange={(e) => handleChange ({title: e.target.value})} 
                    required 
                  />
                </label>
                {/* RATING */}
                <label htmlFor="rating">
                  {/* Rating: */}
                  <TextField id="outlined-basic" label="Rating" variant="outlined"
                    name="rating"
                    // id="rating"
                    type="text"
                    className="form-control"
                    value={state.rating}
                    onChange={(e) => handleChange ({rating: e.target.value})} required 
                  /> 
                </label>
                {/* ID */}
                {/* <label htmlFor="id">
                  Book ID:
                  <input
                    name="id"
                    id="id"
                    type="text"
                    className="form-control"
                    value={state.id}
                    onChange={(e) => handleChange({id: e.target.value})}
                  />
                </label> */}
                <Button variant="contained"onClick={(e) => create(e)}>
                  Add Book
                </Button>
                {/* <button type="button" onClick={(e) => update(e)}>
                  Update Book
                </button> */}
                {/* <button type="button" onClick={(e) => deleteBook(e)}>
                  Delete Book
                </button>  */}
              </Stack>
            </form>
          </Box>
        </div>
      </>
    );
}

export default BookControl;