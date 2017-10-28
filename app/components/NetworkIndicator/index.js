/**
*
* NetworkIndicator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Icon, Tooltip } from 'antd';

// import messages from './messages';
import { offlineModeString } from 'utils/constants';

const Span = styled.span`
  font-size: 26px;
  min-width: 30px;
`;

function NetworkIndicator(props) {
  const { loading, error } = props;
  let component = null;
  if (loading) {
    component = <Icon type="loading" />;
  }
  if (error && error !== offlineModeString) {
    component =
      (<Tooltip placement="bottom" title={error}>
        <Icon type="close-circle-o" style={{ color: 'red' }} />
      </Tooltip>);
  }

  return (
    <Span>
      {component}
    </Span>
  );
}

NetworkIndicator.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default NetworkIndicator;
