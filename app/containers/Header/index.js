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

import { Layout, Menu, Row, Col, Button, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// const { Content, Footer } = Layout;
//const dHeader = Layout.Header;

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

  return (
    <header className="clearfix" style={{ transition: 'opacity 0.5s', background: '#fff', height: 80, marginBottom: 30, padding: '0 48px', width: '100%' }}>
      <Row>
        <Col lg={4} md={5} sm={24} xs={24}>
          <div className="logo" style={{ float: 'left', height: 80, lineHeight: '80px' }} >
            <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" style={{ height: 80, lineHeight: 80, width: 40, marginRight: 8 }} />
            <FormattedMessage {...messages.header} style={{ float: 'right', fontSize: 28, height: 80, lineHeight: 80 }} />
          </div>
        </Col>
        <Col lg={20} md={19} sm={0} xs={0}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['Network']}
            style={{ lineHeight: '78px', border: 0, float: 'right' }}
          >
              <SubMenu title="Network" key="1">
                <MenuItemGroup title="Select ETH network">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
          </Menu>
          <Button shape="circle" icon="reload" style={{ float: 'right', marginTop: 25, marginLeft: 10 }} />
        </Col>
      </Row>
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
