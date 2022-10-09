import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "../App.css";

const BookControl = () => {
  const initialState = {
    books: [],
    title: "",
    author: "",
    rating: "",
    id: "",
    search: "",
    cover: "",
  };

  const [state, setState] = useState(initialState);
  const isRatingValid =
    (state.rating <= 10 && state.rating >= 0) || state.rating === "";
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Book_red%3B_question_marks.svg/2000px-Book_red%3B_question_marks.svg.png";

  const getBooks = (sortCriteria) => {
    fetch(
      `http://localhost:3001/api/v1/books?sort=${sortCriteria}&search=${state.search}`
    )
      .then((response) => response.json())
      .then((books) => setState({ ...state, books }));
  };

  useEffect(() => {
    getBooks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const create = (e) => {
    fetch(`http://localhost:3001/api/v1/books`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        author: state.author,
        title: state.title,
        rating: state.rating,
        cover: state.cover,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        getBooks();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (changeObject) => {
    console.log(changeObject);
    setState({ ...state, ...changeObject });
  };

  let currentlyVisibleState = null;

  const handleSort = (sortName) => {
    getBooks(sortName);
  };

  return (
    <>
      {currentlyVisibleState}
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => handleSort("author")}>sort by author</Button>
            <Button onClick={() => handleSort("title")}>sort by title</Button>
            <Button onClick={() => handleSort("rating")}>sort by rating</Button>
          </ButtonGroup>

          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label="Search by Author"
              variant="outlined"
              onChange={(e) => handleChange({ search: e.target.value })}
            />
            <Button variant="contained" onClick={getBooks}>
              Search by Author
            </Button>
          </Stack>
        </Box>
        <h1 className="center">All Books</h1>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "90vw",
            margin: "0 auto",
            underline: "none",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          {state.books?.map((book, index) => (
            <Card
              key={index}
              sx={{
                padding: "10px",
                margin: "10px",
                minWidth: "200px",
              }}
            >
              <img
                style={{ maxWidth: "200px" }}
                src={book.cover || defaultImage}
                alt="cover"
              />
              <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
                <h2>{book.title}</h2>
                <h3>by {book.author}</h3>
                <h4>{book.rating}/10</h4>
              </Link>
            </Card>
          ))}
        </Box>
        <div className="center">
          <form>
            <h1>Input Book</h1>
            <Stack spacing={2} direction="row">
              <TextField
                id="outlined-basic"
                label="Author"
                variant="outlined"
                name="author"
                type="text"
                className="form-control"
                value={state.author}
                onChange={(e) => handleChange({ author: e.target.value })}
                required
              />

              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                name="title"
                type="text"
                className="form-control"
                value={state.title}
                onChange={(e) => handleChange({ title: e.target.value })}
                required
              />

              <TextField
                error={!isRatingValid}
                id="outlined-basic"
                label="Rating"
                variant="outlined"
                name="rating"
                type="text"
                className="form-control"
                value={state.rating}
                onChange={(e) => handleChange({ rating: e.target.value })}
                required
              />

              <TextField
                name="cover"
                label="Book Url"
                type="text"
                className="form-control"
                value={state.cover}
                onChange={(e) => handleChange({ cover: e.target.value })}
              />

              <Button variant="contained" onClick={(e) => create(e)}>
                Add Book
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookControl;
