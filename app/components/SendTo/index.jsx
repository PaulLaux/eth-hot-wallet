/**
*
* SendTo
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
// import styled from 'styled-components';

function SendTo({ to, onChangeTo, locked }) {
  return (
    <div>
      <Input
        style={{ width: '300px' }}
        placeholder="Send to address"
        prefix={<Icon type="contacts" />}
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
