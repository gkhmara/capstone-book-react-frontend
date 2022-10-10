import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const BookDetail = () => {
  const [state, setState] = useState({});

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const isRatingValid =
    (state.rating <= 10 && state.rating >= 0) || state.rating === "";
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Book_red%3B_question_marks.svg/2000px-Book_red%3B_question_marks.svg.png";

  const navigate = useNavigate();
  const deleteOnClick = (e) => {
    navigate(-1);
    deleteBook(e);
  };

  const getBook = () => {
    fetch(`http://localhost:3001/api/v1/books/${bookId}`)
      .then((response) => response.json())
      .then((book) => setState(book));
  };

  const update = (e) => {
    fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        _id: state.id,
        author: state.author,
        title: state.title,
        rating: state.rating,
        cover: state.cover,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        getBook();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBook = (e) => {
    fetch(`http://localhost:3001/api/v1/books/${state.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        getBook();
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


  useEffect(() => {
    getBook();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(state);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          margin: 10,
          fontSize: 25,
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 2,
          },
        }}
      >
        <Card
          sx={{
            padding: "10px",
            margin: "10px",
            minWidth: "200px",
          }}
        >
          <img
            style={{ maxWidth: "400px" }}
            src={state.cover || defaultImage}
            alt="cover"
          />
          <div>{state.title}</div>
          <div>by {state.author}</div>
          <div>{state.rating}/10</div>
        </Card>
        <Button variant="contained" onClick={(e) => update(e)}>
          Update Book
        </Button>
        <Button variant="contained" onClick={deleteOnClick}>
          Delete Book
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Return to Books
        </Button>
      </Box>

      <div className="center">
        <form>
          <h1>Update Book</h1>
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
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
              type="text"
              className="form-control"
              value={state.cover}
              onChange={(e) => handleChange({ cover: e.target.value })}
            />
          </Stack>
        </form>
      </div>
    </>
  );
};

export default BookDetail;
