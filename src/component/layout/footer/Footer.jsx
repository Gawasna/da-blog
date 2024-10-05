import React from 'react';
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">React Blog</h1>
          <p>
            React Blog is a blog site for sharing knowledge and insights about web development, programming, and more.
          </p>
          <div className="contact">
            <span>
              <i className="fas fa-phone"></i> &nbsp; 123-456-789
            </span>
            <span>
              <i className="fas fa-envelope"></i> &nbsp;    
              <a href="mailto:info@reactblog.com">info@reactblog.com</a>
            </span>
          </div>
          <div className="socials">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <br />
          <ul>
            <li><a href="#">Events</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Mentors</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Terms and Conditions</a></li>
          </ul>
        </div>
        
        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <br />
          <form action="#" method="post">
            <input 
              type="email" 
              name="email" 
              className="text-input contact-input" 
              placeholder="Your email address..." 
              required 
            />
            <textarea
              name="message"
              className="text-input contact-input"
              placeholder="Your message..."
              required
            ></textarea>
            <button type="submit" className="btn btn-big">
              <i className="fas fa-envelope"></i>
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} reactblog.com | Designed by Team 3
      </div>
    </footer>
  );
}

export default Footer;
