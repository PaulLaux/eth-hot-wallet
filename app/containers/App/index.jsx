/**
 * App
 *
 * The skeleton around the page: global styles and the wallet page.
 */

import React from 'react';

import GlobalStyle from '../../global-styles';
import HomePage from 'containers/HomePage';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <HomePage />
    </div>
  );
}
