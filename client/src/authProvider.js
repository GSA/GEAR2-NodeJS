import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'react-admin';

const fetchStatus = () => {
  return fetch('/ustat')
    .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(({ isLoggedIn, groups, user }) => {
      if (isLoggedIn !== 'true') {
        Promise.reject({ redirectTo: '/pass' });
      }
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('groups', groups);
      localStorage.setItem('user', user);
    });
}

export default (type, params) => {
  // console.log(type);
  if (type === AUTH_LOGIN) {
    if (localStorage.isLoggedIn === "false") {
      fetchStatus();
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('ustat');
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
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
