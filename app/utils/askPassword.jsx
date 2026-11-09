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
      autoFocusButton: null, // keep focus in the password field
      onOk: () => resolve(password),
      onCancel: () => resolve(''),
    });
  });
}
