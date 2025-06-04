import React, { useState, useEffect } from "react";
import Book from "../book/Book";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://minigoodreads-api.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log("error fetching", err));
  }, []);

  return (
    <div className="bookList">
      {books.map((book) => (
        <Book
          key={book.id}
          id={Number(book.id)}
          imageLink={`/${book.imageLink.replace(/^\//, "")}`}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
  );
}

export default BookList;
