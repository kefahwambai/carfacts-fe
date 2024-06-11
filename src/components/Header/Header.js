import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you create a Header.css for styles

const Header = ({ user }) => (
  <header className="header">
    <div className="logo"><Link to="/">CARFACTS</Link></div>
    <nav>
      <ul>
        <li><Link to="/services">Our Service</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/business">Business</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        {user ? (
          <li><Link to="/logout">Logout</Link></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            {/* <li><Link to="/signup">Signup</Link></li> */}
          </>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
