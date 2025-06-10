import React from 'react';
import { Home, Book, User, Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css'; // Import CSS file

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footerContainer">

        <div className="footerSection">
          <p className="copyright">&copy; {new Date().getFullYear()} Mini Goodreads by Negar Raeisi. All rights reserved.</p>
          <p className="subtext">Built with passion and code.</p>
        </div>

        <div className="footerSection">
          <h4 className="footerHeading">Quick Links</h4>
          <nav className="footerNav">
            <a href="/" className="footerLink"><Home className="icon" /> Home</a>
            <a href="/list" className="footerLink"><Book className="icon" /> All Books</a>
            <a href="/mybooks" className="footerLink"><User className="icon" /> My Books</a>
          </nav>
        </div>

        <div className="footerSection alignRight">
          <h4 className="footerHeading">Connect With Us</h4>
          <div className="socialIcons">
            <a href="https://github.com" target="_blank" rel="noreferrer"><Github className="iconLg" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="iconLg" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="iconLg" /></a>
          </div>
          <p className="subtext alignRight">Follow us for updates!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
