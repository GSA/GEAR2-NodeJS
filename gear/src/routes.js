import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import Applications from './components/application/Applications';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="applications" component={Applications}/>
  </Route>
);
