import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import "./MyBooks.css";

function MyBooks() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch("https://minigoodreads-api.onrender.com/books");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAllBooks(data);
      } catch (err) {
        console.error("Error fetching all books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAllBooks();
  }, [user]);

  const getBooksByIds = useCallback(
    (ids) => {
      if (!ids || !Array.isArray(ids)) return [];
      return ids
        .map((id) => allBooks.find((book) => Number(book.id) === Number(id)))
        .filter(Boolean);
    },
    [allBooks]
  );

  const wantToReadBooks = useMemo(
    () => getBooksByIds(user?.wantToRead),
    [user, getBooksByIds]
  );
  const readBooks = useMemo(
    () => getBooksByIds(user?.read),
    [user, getBooksByIds]
  );
  const currentlyReadingBooks = useMemo(
    () => getBooksByIds(user?.currentlyReading),
    [user, getBooksByIds]
  );

  if (!user)
    return (
      <div className="my-books-message">Please sign in to view your books.</div>
    );
  if (loading)
    return <div className="my-books-message">Loading your books...</div>;
  if (error) return <div className="my-books-message error">{error}</div>;

  return (
    <div className="myBooksContainer">
      <h3>Currently Reading ({currentlyReadingBooks.length})</h3>
      <section className="bookCategory">
        {currentlyReadingBooks.length === 0 ? (
          <p className="noBooksMessage">
            You are not currently reading any books.
          </p>
        ) : (
          <div className="bookList">
            {currentlyReadingBooks.map((book) => (
              <div key={book.id} className="bookItem">
                <img src={`${process.env.PUBLIC_URL}${book.imageLink}`} alt={book.title} />
                <div className="bookInfo">
                  <h4>{book.title}</h4>
                  <p>by {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <h3>Want to Read ({wantToReadBooks.length})</h3>

      <section className="bookCategory">
        {wantToReadBooks.length === 0 ? (
          <p className="noBooksMessage">Your "Want to Read" list is empty.</p>
        ) : (
          <div className="bookList">
            {wantToReadBooks.map((book) => (
              <div key={book.id} className="bookItem">
                <img src={`${process.env.PUBLIC_URL}${book.imageLink}`} alt={book.title} />
                <div className="bookInfo">
                  <h4>{book.title}</h4>
                  <p>by {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <h3>Read ({readBooks.length})</h3>
      <section className="bookCategory">
        {readBooks.length === 0 ? (
          <p className="noBooksMessage">
            You haven't marked any books as "Read" yet.
          </p>
        ) : (
          <div className="bookList">
            {readBooks.map((book) => (
              <div key={book.id} className="bookItem">
                <img src={`${process.env.PUBLIC_URL}${book.imageLink}`} alt={book.title} />
                <div className="bookInfo">
                  <h4>{book.title}</h4>
                  <p>by {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyBooks;
