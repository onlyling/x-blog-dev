import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loadable from '@loadable/component';

import LayoutAdmin, { TypeSiderNode } from '../../layouts/layout-admin/layout-admin';
import ErrorPage from '../../components/error-page/error-page';

import { getRootPath } from '../../utils';

import * as Store from '../../store';

const PageHome = Loadable(() => import('./home/home'));
const PageUserList = Loadable(() => import('./user-list/user-list'));
const PageBlogList = Loadable(() => import('./blog-list/blog-list'));

const Page404: React.SFC = () => {
  return <ErrorPage code="403" />;
};

const Routes: {
  path: string;
  exact: boolean;
  component: React.ComponentType<any>;
  isMenu: boolean;
  name?: string;
}[] = [
  {
    path: '/',
    exact: true,
    component: PageHome,
    isMenu: true,
    name: 'Dashboard'
  },
  {
    path: '/user/list',
    exact: true,
    component: PageUserList,
    isMenu: true,
    name: '用户管理'
  },
  {
    path: '/blog/list',
    exact: true,
    component: PageBlogList,
    isMenu: true,
    name: '文章管理'
  }
];

const mapStateToProps = ({ User }: Store.iRootState) => ({
  UserInfo: User.UserInfo
});

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps;

class Node extends React.Component<Props, object> {
  getNav = () => {
    const { match } = this.props;
    const RootPath = getRootPath(match.path);
    const nav: TypeSiderNode[] = [];

    Routes.forEach((r) => {
      if (r.isMenu) {
        nav.push({
          path: `${RootPath}${r.path}`,
          name: r.name
        });
      }
    });

    return nav;
  };

  render() {
    const { match, UserInfo, history } = this.props;
    const RootPath = getRootPath(match.path);

    if (!UserInfo.super_admin) {
      return <ErrorPage code="403" />;
    }

    return (
      <LayoutAdmin sider={this.getNav()} history={history}>
        <Switch>
          {Routes.map(({ path, ...res }) => {
            return <Route key={path} path={`${RootPath}${path}`} {...res} />;
          })}
          <Route component={Page404} />
        </Switch>
      </LayoutAdmin>
    );
  }
}

export default connect(mapStateToProps)(Node);
