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

// import SeedInfo from 'components/SeedInfo';
import SeedView from 'components/SeedView';

import messages from './messages';
import { initWallet } from './actions';
import { makeSelectSeed, makeSelectLoading, makeSelectError, makeSelectPassword } from './selectors';
import reducer from './reducer';
import saga from './saga';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /*
  handleClick = () => {
    console.log('this is:', this);
  }*/

  render() {
    const { loading, error, seed, password } = this.props;
    const seedViewProps = {
      loading,
      error,
      seed,
      password,
    };

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <button onClick={this.props.onInitWallet}>
          Generate wallet
        </button>
        <SeedView {...seedViewProps} />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
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
};

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onInitWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // console.log(evt);
      dispatch(initWallet());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  seed: makeSelectSeed(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

