/**
*
* SendTo
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';
// import styled from 'styled-components';

function SendTo({ to, onChangeTo, locked }) {
  return (
    <div>
      <Input
        style={{ width: '300px' }}
        placeholder="Send to address"
        prefix={<ContactsOutlined />}
        value={to}
        onChange={onChangeTo}
        disabled={locked}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
}

SendTo.propTypes = {
  to: PropTypes.string,
  onChangeTo: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendTo;
