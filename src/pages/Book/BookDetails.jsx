import "./BookDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://minigoodreads-api.onrender.com/books/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again.");
      } finally {
        setLoading(false); 
      }
    };

    fetchBook();
  }, [id, setBook]);

  if (loading) {
    return <div className="book-details-message">Loading book details...</div>;
  }

  if (error) {
    return <div className="book-details-message error">{error}</div>;
  }

  if (!book) {
    return <div className="book-details-message">Book not found.</div>;
  }

  return (
    <div className="bookDetailsContainer">
      <img
        src={book.imageLink}
        alt={book.title}
        className="bookDetailsImg"
      />
      <div className="bookDetailsInfo">
        <h1>{book.title}</h1>
        <h2>By: {book.author}</h2>
        <p>
          <strong>Country:</strong> {book.country}
        </p>
        <p>
          <strong>Language:</strong> {book.language}
        </p>
        <p>
          <strong>Pages:</strong> {book.pages}
        </p>
        <p>
          <strong>Year:</strong> {book.year}
        </p>
        {book.link && (
          <p>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              More info
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default BookDetails;