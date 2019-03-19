import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loadable from 'react-loadable';

import LayoutHome from '../../layouts/layout-home/layout-home';
import LoadingComponent from '../../components/page-loading/page-loading';
import Page404 from '../../components/404/404';

import { getRootPath } from '../../utils';

const PageHome = Loadable({
  loader: () => import('./home/home'),
  loading: LoadingComponent
});

const PageUserCenter = Loadable({
  loader: () => import('./user-center/user-center'),
  loading: LoadingComponent
});

class Node extends Component<RouteComponentProps, object> {
  render() {
    const { match } = this.props;
    const RootPath = getRootPath(match.path);

    return (
      <LayoutHome>
        <Switch>
          <Route exact path={`${RootPath}/`} component={PageHome} />
          <Route exact path={`${RootPath}/user/:id`} component={PageUserCenter} />
          <Route component={Page404} />
        </Switch>
      </LayoutHome>
    );
  }
}

export default Node;
