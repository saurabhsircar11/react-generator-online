import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Include bootstrap’s css
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import './../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css';
// Import JS files for Bootstrap
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/popper.js/dist/popper.min.js';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
