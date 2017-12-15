/**
*
* IconButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import styled from 'styled-components';

const errorIcon = 'close-circle-o';
const Span = styled.span`
.anticon-${errorIcon} {
  color: red;
  font-weight: bold;
}
`;

function IconButton(props) {
  const { text, icon, onClick, loading, error, disabled } = props;

  if (error) {
    return (
      <Span>
        <Button
          icon={errorIcon}
          type="default"
          size="large"
          onClick={onClick}
          disabled={disabled}
          loading={loading}
        >
          {text}
        </Button>
      </Span>
    );
  }

  return (
    <Button
      icon={icon}
      type="default"
      size="large"
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {text}
    </Button>
  );
}

IconButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
};

export default IconButton;
