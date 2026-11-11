import React from 'react';
import { Input, Modal } from 'antd';

/** Ask for the wallet password in a modal; resolves to '' if cancelled */
export default function askPassword() {
  return new Promise((resolve) => {
    let password = '';
    const dialog = Modal.confirm({
      title: 'Enter wallet password',
      content: (
        <Input.Password
          autoFocus
          onChange={(e) => { password = e.target.value; }}
          onPressEnter={() => { dialog.destroy(); resolve(password); }}
        />
      ),
      // keep focus in the password field. Deprecated, but the replacement focusable.autoFocusButton
      // is merged with `||` in antd (6.6.8, 6.7.0), so null becomes 'ok' and the OK button takes focus
      autoFocusButton: null,
      onOk: () => resolve(password),
      onCancel: () => resolve(''),
    });
  });
}
