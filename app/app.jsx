/**
 * app.js
 *
 * Entry file for the application: setup and boilerplate code only.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import 'sanitize.css/sanitize.css';
import 'antd/dist/antd.css';

import App from 'containers/App';
import configureStore from './store';
import './global-styles';

// Create redux store with history
const history = createHistory();
export const store = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
