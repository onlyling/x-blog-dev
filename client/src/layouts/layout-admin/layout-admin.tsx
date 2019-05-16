import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

import Styles from './layout-admin.module.less';

import { ClickParam } from 'antd/lib/menu';
import * as H from 'history';

const { Sider, Content } = Layout;

export type TypeSiderNode = {
  path: string;
  name?: string;
  icon?: string;
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
              {s.icon ? <Icon type={s.icon} /> : ''}
              {s.name}
            </Menu.Item>
          );
        })}
        <Menu.Item key="/">
          <Icon type="home" />
          返回首页
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
          <Content className={Styles['content']}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Node;
