/**
*
* IconButton
*
*/

import React from 'react';
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

const Btn = ({ error, popconfirm, text, loading, disabled, popconfirmMsg, onClick, icon, ...btnProps }) => (
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
  const { text, icon, onClick, loading, error, disabled, popconfirmMsg, ...btnProps } = props;

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

  const BtnProps = { text, icon, onClick, loading, error, disabled, popconfirmMsg, ...btnProps };
  return (
    handleError(error,
      handlePopconfirm(popconfirmMsg, onClick,
        <Btn
          {...BtnProps}

        />
      )
    )
  );
}

export default IconButton;
