import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

import * as H from 'history';

import Styles from './layout-home.module.less';

const { Sider, Content } = Layout;

// props
interface TypeNodeProps {
  location: H.Location;
}

// 链接的类型
type TypeSiderLink = {
  text: string;
  link: string;
};

class Node extends Component<TypeNodeProps> {
  // 构建侧边栏链接
  getSiderLinks = () => {
    let baseLink: TypeSiderLink[] = [
      {
        text: '首页',
        link: '/'
      }
    ];

    if (false) {
      baseLink = baseLink.concat([
        {
          text: '登录',
          link: '/login'
        }
      ]);
    } else {
      baseLink = baseLink.concat([
        {
          text: '个人中心',
          link: '/user/123'
        }
      ]);
      if (true) {
        baseLink = baseLink.concat([
          {
            text: '管理中心',
            link: '/admin'
          }
        ]);
      }
    }

    return (
      <ul className={Styles['links']}>
        {baseLink.map((i) => {
          return (
            <li key={i.link}>
              <Link to={i.link} className={Styles['link']}>
                {i.text}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  // 头像信息
  getAvatarInfo = () => {
    const { pathname } = this.props.location;
    let avatarInfo = {
      user_name: '用户名在这里',
      intro: '一个简单的介绍在这里一个简单的介绍在这里一个简单的介绍在这里一个简单的介绍在这里',
      avatar: 'https://avatars2.githubusercontent.com/u/9999765?s=460&v=4'
    };
    if (pathname.indexOf('/blog/') === 0) {
      // TODO 获取用户信息
    }

    return (
      <Fragment>
        <div className={Styles['avatar']}>
          <img src={avatarInfo.avatar} alt={avatarInfo.user_name} />
        </div>
        <div className={Styles['user-name']}>{avatarInfo.user_name}</div>
        <div className={Styles['intro']}>{avatarInfo.intro}</div>
      </Fragment>
    );
  };

  getFooter = () => {
    return (
      <Fragment>
        <p className="text-center">&copy; 2019 - x-blog-dev</p>
        <p className="text-center">
          Powered by <a href="https://github.com/onlyling/x-blog-dev">x-blog-dev</a>
        </p>
      </Fragment>
    );
  };

  render() {
    const { children } = this.props;

    return (
      <Layout className="app-box">
        <Sider className={Styles['sider']}>
          {this.getAvatarInfo()}
          {this.getSiderLinks()}
        </Sider>

        <Layout className={Styles['content-box']}>
          <Content className={Styles['content']}>
            {children}
            {this.getFooter()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Node;
