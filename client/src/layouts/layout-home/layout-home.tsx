import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

import { TypeUserModel } from '../../types/model';

import Styles from './layout-home.module.less';

const { Content } = Layout;

// props
interface TypeNodeProps {
  UserInfo: TypeUserModel;
}

// 链接的类型
type TypeSiderLink = {
  text: string;
  link: string;
};

class Node extends Component<TypeNodeProps> {
  // 构建侧边栏链接
  getSiderLinks = () => {
    const { UserInfo } = this.props;

    let baseLink: TypeSiderLink[] = [
      {
        text: '首页',
        link: '/'
      }
    ];

    if (!!!UserInfo.id) {
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
    const avatarInfo = {
      user_name: '站点名称',
      intro: '一个简单的介绍在这里一个简单的介绍在这里一个简单的介绍在这里一个简单的介绍在这里',
      avatar: 'https://avatars2.githubusercontent.com/u/9999765?s=460&v=4'
    };

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
        <br />
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
      <Fragment>
        <div className={Styles['sider']}>
          {this.getAvatarInfo()}
          {this.getSiderLinks()}
        </div>

        <Layout className={Styles['content-box']}>
          <Content className={Styles['content']}>
            {children}
            {this.getFooter()}
          </Content>
        </Layout>
      </Fragment>
    );
  }
}

export default Node;
