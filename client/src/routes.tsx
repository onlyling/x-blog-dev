import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingComponent from './components/page-loading/page-loading';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

// 门户页面
const PortalPages = Loadable({
  loader: () => import('./pages/portal/portal'),
  loading: LoadingComponent
});

// 管理页面
const AdminPages = Loadable({
  loader: () => import('./pages/admin/admin'),
  loading: LoadingComponent
});

const AdminLogin = Loadable({
  loader: () => import('./pages/login/login'),
  loading: LoadingComponent
});

const AdminRegister = Loadable({
  loader: () => import('./pages/register/register'),
  loading: LoadingComponent
});

const Node: React.FunctionComponent = () => {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/login" component={AdminLogin} />
          <Route exact path="/register" component={AdminRegister} />
          <Route path="/admin" component={AdminPages} />
          <Route path="/" component={PortalPages} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};
export default Node;
