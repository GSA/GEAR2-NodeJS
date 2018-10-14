import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

class LoginPage extends Component {
  componentDidMount() {
    let redir = '/beginAuth';
    if (window.location.host === 'localhost:3000') {
      redir = 'http://localhost:3334' + redir;
    }
    window.location = redir;
  }

  // nothing to render, really, but for now, show a div as a sanity check
  render() {
    return (
      <div>
        Redirecting to authentication provider...
      </div>
    );
  }
};

export default connect(undefined, { userLogin })(LoginPage);
