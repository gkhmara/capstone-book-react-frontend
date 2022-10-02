import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';




const BookDetail = () => {
  const [state, setState] = useState({});

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];


  const getBook = () => {
    fetch(`http://localhost:3001/api/v1/books/${bookId}`)
    .then(response => response.json())
    .then(book => setState( book ));
  };

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
        getBook();
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
      getBook();
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }
  //DELETE --END --NEW

  useEffect(() => {
    getBook();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(state);

  return (
    <>
    <div>{state.id}</div>
    <div>{state.author}</div>
    <div>{state.title}</div>
    <div>{state.rating}</div>
    <Button variant="contained" onClick={(e) => update(e)}>
      Update Book
    </Button>
    <Button variant="contained" onClick={(e) => deleteBook(e)}>
      Delete Book
    </Button> 
    </>
  );
  
  
};




export default BookDetail;