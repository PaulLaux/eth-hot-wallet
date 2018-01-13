/**
 *
 * TokenChooser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectTokenChooser } from './selectors';
import reducer from './reducer';
import saga from './saga';

function TokenChooser(props) {
  const { isShowTokenChooser, onHideTokenChooser } = props;
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Modal
        visible={isShowTokenChooser}
        title="Select Tokens"
        onOk={onHideTokenChooser}
        onCancel={onHideTokenChooser}
        footer={null}
      >

        <Button onClick={onHideTokenChooser} disabled={false} >
          Create transaction
        </Button>

      </Modal>
    </div>
  );
}

TokenChooser.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  isShowTokenChooser: PropTypes.bool,
  onHideTokenChooser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokenchooser: makeSelectTokenChooser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tokenchooser', reducer });
const withSaga = injectSaga({ key: 'tokenchooser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TokenChooser);
