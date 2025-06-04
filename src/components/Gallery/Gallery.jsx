import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Gallery.css';

function Gallery() {
  const [allBooks, setAllBooks] = useState([]);
  const [galleryBooks, setGalleryBooks] = useState([]);

  useEffect(() => {
    fetch("https://minigoodreads-api.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data))
      .then((err) => console.log("error fetching for gallery", err));
  }, []);

  useEffect(() => {
    const updateGallery = () => {
      const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
      setGalleryBooks(shuffled.slice(0, 6));
    };
    updateGallery();
    const interval = setInterval(updateGallery, 5000);
    return () => clearInterval(interval);
  }, [allBooks]);

  return (
    <div className="galleryContainer">
      <h1>Explore Popular Books for Your Next Read!</h1>
    <div className="gallery"> 
      {galleryBooks.map((book, i) => (
        <Link to={`/books/${book.id}`} key={book.id}><div className="item">
        <img
          key={i}
          src={`${process.env.PUBLIC_URL}${book.imageLink}`}
          alt={book.title}
        /></div></Link>
      ))}
    </div></div>
  );
}

export default Gallery;