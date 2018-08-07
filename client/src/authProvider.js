import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
//import decodeJwt from 'jwt-decode';

const fetchStatus = () => {
  return fetch('/authenticate')
    .then(response => {
        console.log('STATUS HAS BEEN FETCHED')
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(({ isLoggedIn, groups, user }) => {
      if (isLoggedIn !== 'true') {
        Promise.reject({ redirectTo: '/pass' });
      }
      console.log('PROMISE AFTER AUTH');
      localStorage.setItem('isLoggedIn', isLoggedIn);
      localStorage.setItem('groups', groups);
      localStorage.setItem('user', user);
    });
}

export default (type, params) => {
  console.log('AUTH SWITCH HAS BEEN CALLED');
  console.log(type);
  if (type === AUTH_LOGIN) {
    if (localStorage.isLoggedIn === "false") {
      console.log('NOW FETCH STATUS');
      fetchStatus();
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('ustat');
    return Promise.resolve();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    console.log('FETCH AUTH')
    fetch('/authenticate')
      .then(response => {
          console.log('STATUS HAS BEEN FETCHED')
          if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
          }
          return response.json();
      })
      .then(({ isLoggedIn, groups, user }) => {
        if (isLoggedIn !== 'true') {
          Promise.reject({ redirectTo: '/pass' });
        }
        console.log('PROMISE AFTER AUTH');
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('groups', groups);
        localStorage.setItem('user', user);
      });
  }
  if (type === AUTH_CHECK) {
    console.log('AUTH CHECK CALLED')
    if (localStorage.isLoggedIn === "false") {
      fetchStatus();
    } else {
      const { resource } = params;
      if (resource === 'application') {
        console.log('WE CAN START APPLYING RESTRITCIONS NOW');
      }
    }
  }
  return Promise.resolve();
}
