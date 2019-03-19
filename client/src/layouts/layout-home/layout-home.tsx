import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

import Styles from './layout-home.module.less';

const { Header, Footer, Sider, Content } = Layout;

class Node extends Component {
  render() {
    const { children } = this.props;

    return (
      <Layout className="app-box">
        <Sider>Sider</Sider>
        <Layout>
          <Header className={Styles['top-header']}>
            <Link to="/admin">to admin</Link>
            &emsp;
            <Link to="/user/123">to user center</Link>
            &emsp;
            <Link to="/">to home</Link>
            &emsp;
            <Link to="/login">to login</Link>
            &emsp;
            <Link to="/register">to register</Link>
          </Header>
          <Content>{children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Node;
