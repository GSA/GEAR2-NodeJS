import React, {Component} from "react";
import {Link} from "react-router";

class HomePage extends Component {

  render() {
    return (
      <div>
        <Link to="about">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;