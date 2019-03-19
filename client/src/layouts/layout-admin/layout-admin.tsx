import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

// import Styles from './layout-home.module.less';

const { Header, Sider, Content } = Layout;

class Node extends Component {
  render() {
    const { children } = this.props;

    return (
      <Layout className="app-box">
        <Sider>Sider</Sider>
        <Layout>
          <Header>
            <Link to="/">to home</Link>
            &emsp;
            <Link to="/admin/user/list">to user list</Link>
            &emsp;
            <Link to="/admin/blog/list">to blog list</Link>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Node;
