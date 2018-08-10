import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import decodeJwt from 'jwt-decode';

const authEntry = '/beginAuth';

const isValidJwt = () => {
  const decodedToken = decodeJwt(localStorage.jwt);
  if (!decodedToken.hasOwnProperty('scopes')
      || !decodedToken.hasOwnProperty('exp')
      || !decodedToken.hasOwnProperty('sub')) {
    return false;
  }
  if (decodedToken.hasOwnProperty('exp')) {
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      return false;
    }
  }
  if (decodedToken.hasOwnProperty('scopes') && decodedToken.scopes.length == 0) {
    return false;
  }
  return true;
}

const extractScopes = () => {
  // only called if valid token
  const decodedToken = decodeJwt(localStorage.jwt);
  localStorage.setItem('scopes', decodedToken.scopes);
}

export default (type, params) => {
  // console.log('AUTH PROVIDING:  ' + type);
  if (type === AUTH_LOGIN) {
    // should no longer be triggered (see LoginPage.js)
  }
  if (type === AUTH_LOGOUT) {
    // console.log('AUTH logout');
    // TODO: remove jwt? or set exp to expire now?
    localStorage.removeItem('jwt');
    return Promise.resolve();
    // return Promise.reject({ redirectTo: authEntry });
  }
  if (type === AUTH_ERROR) {
    // console.log('AUTH error');
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject({ redirectTo: authEntry });
    }
    return Promise.resolve();
  }
  // AUTH_CHECK is intended to only validate the jwt
  if (type === AUTH_CHECK) {
    if (isValidJwt()) {
      return Promise.resolve();
    } else {
      Promise.reject({ redirectTo: authEntry });
    }
  }
  if (type === AUTH_GET_PERMISSIONS) {
      // would not reach this event without passing AUTH_CHECK
      extractScopes();
      // console.log('SCOPES PULLED: ' + localStorage.scopes);
      return Promise.resolve();
  }
  return Promise.reject('UNKNOWN METHOD');
}
