import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

class LoginPage extends Component {
  componentDidMount() {
    console.log('TRIGGER LOGIN!')
    // using SAML so no creds, just trigger AUTH_LOGIN in authProvider
    const credentials = {};
    // dispatches userLogin action
    this.props.userLogin(credentials);
  }

  // nothing to render, really, but for now, show a div as a sanity check
  render() {
    return (
      <div>Login Page</div>
    );
  }
};

export default connect(undefined, { userLogin })(LoginPage);
