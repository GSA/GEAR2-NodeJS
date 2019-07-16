import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'c',
});

ReactDOM.render(<JssProvider generateClassName={generateClassName}><App /></JssProvider>, document.getElementById('root'));
