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

const Span = styled.span`
  .anticon {
    color: black;
  }
  .ant-btn{
    color: black;
  }
  `;


function IconButton(props) {
  const { text, icon, onClick, loading, error, disabled, popconfirmMsg } = props;

  const Btn = ({ popconfirm, ...btnProps }) => (
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
  };


  const handleError = (err, component) => {
    if (err) {
      return (
        <Tooltip placement="top" title={`${err} - Click to retry`}>
          <ErrorSpan>
            {component}
          </ErrorSpan>
        </Tooltip>
      );
    }
    return (component);
  };

  const handlePopconfirm = (popConfirmText, component) => {
    if (popConfirmText) {
      return (
        <Popconfirm placement="bottom" title={popConfirmText} onConfirm={onClick} okText="Confirm" cancelText="Abort">
          {component}
        </Popconfirm>
      );
    }
    return (component);
  };

  return (
    handleError(error,
      handlePopconfirm(popconfirmMsg,
        <Btn />
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
