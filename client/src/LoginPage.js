import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

class LoginPage extends Component {
  componentDidMount() {
    window.location = '/beginAuth'
  }

  // nothing to render, really, but for now, show a div as a sanity check
  render() {
    return (
      <div>Login Page</div>
    );
  }
};

export default connect(undefined, { userLogin })(LoginPage);
