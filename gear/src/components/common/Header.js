import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {

  return (
    <nav>
      <IndexLink to="/">Home</IndexLink>
      {" | "}
      <Link to="/applications">Applications</Link>
      {" | "}
      <Link to="/about">About</Link>
    </nav>
  )
};

export default Header;