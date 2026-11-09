/**
*
* NetworkIndicator
*
*/

import React from 'react';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'antd';
import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

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
    component = <LoadingOutlined />;
  }
  if (error && error !== offlineModeString) {
    component =
      (<Tooltip placement="bottom" title={error}>
        <CloseCircleOutlined style={{ color: 'red' }} />
      </Tooltip>);
  }

  return (
    <Span>
      {component}
    </Span>
  );
}

export default NetworkIndicator;
