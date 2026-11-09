/**
 * app.js
 *
 * Entry file for the application: setup and boilerplate code only.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'sanitize.css/sanitize.css';
import 'antd/dist/antd.css';

import App from 'containers/App';
import createStore from './store';

ReactDOM.render(
  <Provider store={createStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
