/**
*
* NetworkIndicator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Icon } from 'antd';

import messages from './messages';

function NetworkIndicator(props) {
  const { loading, error, blockNumber } = props;
  let component = null;
  if (loading) {
    component = <Icon type="loading" />;
  }
  if (error && error !== 'Offline Mode') {
    component = <Icon type="close-circle-o" style={{ color: 'red' }} />;
  }

  return (
    <span style={{ fontSize: 26, minWidth: 40 }}>
      {component}
    </span>
  );
}

NetworkIndicator.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  blockNumber: PropTypes.number,
};

export default NetworkIndicator;
