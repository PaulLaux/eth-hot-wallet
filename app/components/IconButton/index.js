/**
*
* IconButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Tooltip } from 'antd';
import styled from 'styled-components';

const ErrorSpan = styled.span`
  .anticon {
    color: red;
  }
  .ant-btn{
    color: red;
  }
  `;

const Btn = ({ popconfirm, text, loading, disabled, popconfirmMsg, onClick, icon, ...btnProps }) => (
  <Button
    icon={icon}
    type="default"
    size="large"
    onClick={popconfirmMsg ? null : onClick}
    disabled={disabled}
    loading={loading}
    {...btnProps}
  >
    {text}
  </Button>
);
Btn.propTypes = {
  popconfirm: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  popconfirmMsg: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

const handlePopconfirm = (popConfirmText, onClick, component) => {
  if (popConfirmText) {
    return (
      <Popconfirm placement="top" title={popConfirmText} onConfirm={onClick} okText="Confirm" cancelText="Abort">
        {component}
        <span />
      </Popconfirm>
    );
  }
  return (component);
};

function IconButton(props) {
  const { text, icon, onClick, loading, error, disabled, popconfirmMsg } = props;

  const handleError = (err, component) => {
    if (err) {
      return (
        <Tooltip placement="bottom" title={`${err} - Click to retry`}>
          <ErrorSpan>
            {component}
          </ErrorSpan>
        </Tooltip>
      );
    }
    return (component);
  };

  return (
    handleError(error,
      handlePopconfirm(popconfirmMsg, onClick,
        <Btn
          text={text}
          loading={loading}
          disabled={disabled}
          popconfirmMsg={popconfirmMsg}
          onClick={onClick}
          icon={icon}
        />
      )
    )
  );
}

IconButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,

  onClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  popconfirmMsg: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

};


export default IconButton;
