import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';




const BookDetail = () => {
  const [state, setState] = useState({});

  const location = useLocation();
  const bookId = location.pathname.split("/")[2];


  const getBook = () => {
    fetch(`http://localhost:3001/api/v1/books/${bookId}`)
    .then(response => response.json())
    .then(book => setState( book ));
  };

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
    </>
  );
  
  
};




export default BookDetail;