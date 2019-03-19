import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loadable from 'react-loadable';

import LayoutAdmin from '../../layouts/layout-admin/layout-admin';
import LoadingComponent from '../../components/page-loading/page-loading';
import Page404 from '../../components/404/404';

import { getRootPath } from '../../utils';

const PageUserList = Loadable({
  loader: () => import('./user-list/user-list'),
  loading: LoadingComponent
});

const PageBlogList = Loadable({
  loader: () => import('./blog-list/blog-list'),
  loading: LoadingComponent
});

class Node extends Component<RouteComponentProps, object> {
  render() {
    const { match } = this.props;
    const RootPath = getRootPath(match.path);

    return (
      <LayoutAdmin>
        <Switch>
          <Route exact path={`${RootPath}/user/list`} component={PageUserList} />
          <Route exact path={`${RootPath}/blog/list`} component={PageBlogList} />
          <Route component={Page404} />
        </Switch>
      </LayoutAdmin>
    );
  }
}

export default Node;
