/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// import { makeSelectSeed, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import Header from 'containers/Header';
import { loadNetwork } from 'containers/Header/actions';

import SeedView from 'components/SeedView';
import AddressView from 'components/AddressView';

import messages from './messages';

import { initWallet, generateKeystore } from './actions';

import {
  makeSelectSeed,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectAddresses,
  makeSelectKeystore,
} from './selectors';

import reducer from './reducer';
import saga from './saga';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { loading, error, seed, password, onGenerateKeystore } = this.props;
    const seedViewProps = {
      loading,
      error,
      seed,
      password,
      onGenerateKeystore,
    };

    const { isComfirmed, addresses, keystore } = this.props;
    const addressViewProps = { isComfirmed, addresses, keystore };

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Header />
        <button onClick={this.props.onInitWallet}>
          Generate wallet
        </button>
        <SeedView {...seedViewProps} />
        <hr />
        <AddressView {...addressViewProps} />
        <br />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onInitWallet: PropTypes.func,
  onGenerateKeystore: PropTypes.func,

  isComfirmed: PropTypes.bool,
  addresses: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  keystore: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onInitWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(initWallet());
    },
    onGenerateKeystore: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateKeystore());
    },
    onLoadNetwork: (evt) => {
      console.log('evt'+evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('local'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  seed: makeSelectSeed(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isComfirmed: makeSelectIsComfirmed(),
  addresses: makeSelectAddresses(),
  keystore: makeSelectKeystore(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

