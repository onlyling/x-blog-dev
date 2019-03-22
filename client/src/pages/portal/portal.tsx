import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loadable from 'react-loadable';

import LayoutHome from '../../layouts/layout-home/layout-home';
import LoadingComponent from '../../components/page-loading/page-loading';
import Page404 from '../../components/404/404';

import { getRootPath } from '../../utils';

// 首页
const PageHome = Loadable({
  loader: () => import('./home/home'),
  loading: LoadingComponent
});

// 用户中心
const PageUserCenter = Loadable({
  loader: () => import('./user-center/user-center'),
  loading: LoadingComponent
});

const PageBlog = Loadable({
  loader: () => import('./blog/blog'),
  loading: LoadingComponent
});

class Node extends Component<RouteComponentProps, object> {
  render() {
    const { match, location } = this.props;
    const RootPath = getRootPath(match.path);

    return (
      <LayoutHome location={location}>
        <Switch>
          <Route exact path={`${RootPath}/`} component={PageHome} />
          <Route exact path={`${RootPath}/category/:id`} component={PageHome} />
          <Route exact path={`${RootPath}/user/:id`} component={PageUserCenter} />
          <Route exact path={`${RootPath}/blog/:id`} component={PageBlog} />
          <Route component={Page404} />
        </Switch>
      </LayoutHome>
    );
  }
}

export default Node;
