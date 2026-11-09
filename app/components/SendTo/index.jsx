/**
*
* SendTo
*
*/

import React from 'react';
import { Input } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';
// import styled from 'styled-components';

function SendTo({ to, onChangeTo, locked }) {
  return (
    <div>
      <Input
        style={{ width: '100%', maxWidth: 300 }}
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

export default SendTo;
