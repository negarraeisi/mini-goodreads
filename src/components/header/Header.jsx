import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
        <Link to="/myBooks" onClick={() => setMenuOpen(false)}><li>My Books</li></Link>
        <Link to="/list" onClick={() => setMenuOpen(false)}><li>List</li></Link>
        <Link to="/SignIn" onClick={() => setMenuOpen(false)}><li>Sign In</li></Link>
        <Link to="/SignUp" onClick={() => setMenuOpen(false)}><li>Sign up</li></Link>
      </ul>
    </nav>
  );
}

export default Header;