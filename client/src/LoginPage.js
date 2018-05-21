import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

class LoginPage extends Component {
    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = { };

        // Dispatch the userLogin action (injected by connect)
        this.props.userLogin(credentials);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
            ...
            </form>
        );
    }
};

export default connect(undefined, { userLogin })(LoginPage);
