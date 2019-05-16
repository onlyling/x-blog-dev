import React, { Component } from 'react';

import { Layout, Menu } from 'antd';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

// import Styles from './layout-home.module.less';

import { ClickParam } from 'antd/lib/menu';
import * as H from 'history';

const { Sider, Content } = Layout;

export type TypeSiderNode = {
  path: string;
  name?: string;
};

type Props = {
  sider: TypeSiderNode[];
  history: H.History;
};

class Node extends Component<Props, object> {
  handlerMenu = (e: ClickParam) => {
    this.props.history.push(e.key);
  };

  getSiderHTML = () => {
    const { sider } = this.props;
    return (
      <Menu defaultSelectedKeys={[]} defaultOpenKeys={[]} mode="inline" theme="dark" onClick={this.handlerMenu}>
        {sider.map((s) => {
          return (
            <Menu.Item key={s.path}>
              <span>{s.name}</span>
            </Menu.Item>
          );
        })}
        <Menu.Item key="/">
          <span>返回首页</span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { children } = this.props;
    return (
      <Layout className="app-box">
        <Sider>{this.getSiderHTML()}</Sider>
        <Layout>
          <Content>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Node;
