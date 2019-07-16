import React from 'react';
import { connect } from 'react-redux';
import { Responsive, userLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';

const LogoutButton = ({ userLogout, ...rest }) => (
    <Responsive
        xsmall={
            <MenuItem
                onClick={userLogout}
            >
                <ExitIcon /> Logout
            </MenuItem>
        }
        medium={
            <Button
                onClick={userLogout}
                size="small"
            >
                <ExitIcon /> Logout
            </Button>
        }
    />
);
export default connect(undefined, { userLogout: () => {
  localStorage.jwt = '';
  let redir = '/beginAuth';
  if (window.location.host === 'localhost:3000') {
    redir = 'http://localhost:7000/'
  }
  window.location = redir;
} })(LogoutButton);
