/**
 *
 * TokenChooser
 *
 */

import React from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TokenChooserList from 'components/TokenChooserList';
import { makeSelectNetworkName } from 'containers/Header/selectors';
import { makeSelectChosenTokens } from './selectors';
import { toggleToken, confirmNewTokenInfo } from './actions';
// import { makeSelectTokenChooser } from './selectors';
import TokenSelection from './token-lists';

function TokenChooser(props) {
  const {
    isShowTokenChooser,
    onHideTokenChooser,

    chosenTokens,
    onToggleToken,
    onConfirmNewTokenInfo,
    networkName,

   } = props;

  const TokensForNetwork = TokenSelection[networkName];

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Modal
        open={isShowTokenChooser}
        title={`Select Tokens - ${networkName}`}
        onOk={onHideTokenChooser}
        onCancel={onHideTokenChooser}
        footer={null}
      >
        <TokenChooserList
          tokenList={TokensForNetwork}
          chosenTokens={chosenTokens}
          onTokenToggle={onToggleToken}
        />
        <br />
        <Button type="primary" onClick={() => onConfirmNewTokenInfo(chosenTokens, networkName)} disabled={false} >
          Update
        </Button>{' '}
        <Button onClick={() => onConfirmNewTokenInfo()} disabled={false} >
          Remove Tokens
        </Button>
      </Modal>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  chosenTokens: makeSelectChosenTokens(),

  networkName: makeSelectNetworkName(),

});

function mapDispatchToProps(dispatch) {
  return {
    onToggleToken: (symbol, toggle) => {
      dispatch(toggleToken(symbol, toggle));
    },
    onConfirmNewTokenInfo: (chosenTokens, networkName) => {
      dispatch(confirmNewTokenInfo(chosenTokens, networkName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenChooser);
