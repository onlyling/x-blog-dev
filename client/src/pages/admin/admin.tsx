import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loadable from '@loadable/component';

import LayoutAdmin from '../../layouts/layout-admin/layout-admin';
import Page404 from '../../components/404/404';

import { getRootPath } from '../../utils';

const PageUserList = Loadable(() => import('./user-list/user-list'));

const PageBlogList = Loadable(() => import('./blog-list/blog-list'));

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
