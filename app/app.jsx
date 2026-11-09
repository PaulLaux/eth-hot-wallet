/**
 * app.js
 *
 * Entry file for the application: setup and boilerplate code only.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';

import App from 'containers/App';
import createStore from './store';

createRoot(document.getElementById('app')).render(
  <Provider store={createStore()}>
    <App />
  </Provider>
);
