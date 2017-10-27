/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NetworkLabel from 'components/NetworkLabel';
import NetworkSelector from 'components/NetworkSelector';

// import { changeBalance } from 'containers/HomePage/actions';
import { makeSelectAddressList } from 'containers/HomePage/selectors';

import {
  makeSelectNetworkReady,
  makeSelectLoading,
  makeSelectError,
  makeSelectNetworkName,
  makeSelectBlockNumber,
  makeSelectAvailableNetworks,
  /*makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,*/
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadNetwork, getExchangeRates } from './actions';

import walletLogo from './hot-wallet.svg';


import { Layout, Menu, Row, Col, Button, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// const { Content, Footer } = Layout;
// const dHeader = Layout.Header;

function Header(props) {
  const { loading, error, networkName, blockNumber, availableNetworks, onLoadNetwork, onGetExchangeRates } = props;
  const networkLabelProps = {
    loading,
    error,
    networkName,
    blockNumber,
  };

  const networkSelectorProps = { networkName, availableNetworks, onLoadNetwork };

  // const { checkingBalanceDoneTime, checkingBalances, checkingBalancesError } = props;
  let options;
  if (availableNetworks) {
    options = availableNetworks.map((network) =>
      <Menu.Item key={network}>{network}</Menu.Item>
    );
  }

  return (
    <header className="clearfix" style={{ transition: 'opacity 0.5s', background: '#fff', height: 80, marginBottom: 30, padding: '0', width: '100%', fontSize: 16 }}>
      <Row type="flex" align="middle" justify="space-between" style={{ backgroundColor: 'white' }}>
        <Col md={{ span: 5, offset: 1 }} sm={6} xs={23}>
          <div className="logo" style={{ height: '80px', lineHeight: '80px', fontSize: 18 }} >
            <img alt="logo" src={walletLogo} style={{ height: 40, lineHeight: '80px', width: 40, marginRight: 10 }} />
            <FormattedMessage {...messages.header} style={{ float: 'right', height: 80, lineHeight: 80 }} />
          </div>
        </Col>
        <Col md={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} xs={22}>
          <Row type="flex" align="middle" justify="center">
            <Button loading={loading} shape="circle" icon="reload" style={{}} />
            {error && error !== 'Offline Mode' ? <Icon type="close-circle-o" style={{ fontSize: 26, color: 'red' }} /> : null}
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[networkName]}
              style={{ lineHeight: '78px', border: 0, textAlign: 'center' }}
              onClick={(evt) => onLoadNetwork(evt.key)}
            >
              <SubMenu title={networkName} key="1">
                <MenuItemGroup title="Select ETH network">
                  {options}
                </MenuItemGroup>
              </SubMenu>
            </Menu>
          </Row>
        </Col>
      </Row >
      {/* <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
  </Footer> */}


      <NetworkLabel {...networkLabelProps} />
      <NetworkSelector {...networkSelectorProps} />
      <br />
      <button onClick={onGetExchangeRates}>
        GetExchangeRates
      </button>
      <hr />
    </header >
  );
}

Header.propTypes = {
  onLoadNetwork: PropTypes.func.isRequired,
  onGetExchangeRates: PropTypes.func.isRequired,
  // onCheckBalances: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  networkName: PropTypes.string,
  availableNetworks: PropTypes.object,
  blockNumber: PropTypes.number,

  // addressList: PropTypes.oneOfType([ PropTypes.bool,PropTypes.object]),

  /* checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]), */
};

const mapStateToProps = createStructuredSelector({
  networkReady: makeSelectNetworkReady(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  networkName: makeSelectNetworkName(),
  availableNetworks: makeSelectAvailableNetworks(),
  blockNumber: makeSelectBlockNumber(),
  addressList: makeSelectAddressList(),
  /* checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(), */
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadNetwork: (name) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      console.log(name);
      dispatch(loadNetwork(name));
    },
    onGetExchangeRates: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getExchangeRates());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
