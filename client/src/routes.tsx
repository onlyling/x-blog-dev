import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from '@loadable/component';

import ScrollToTop from './components/scroll-to-top/scroll-to-top';

// 门户页面
const PortalPages = Loadable(() => import('./pages/portal/portal'));

// 管理页面
const AdminPages = Loadable(() => import('./pages/admin/admin'));

const AdminLogin = Loadable(() => import('./pages/login/login'));

const AdminRegister = Loadable(() => import('./pages/register/register'));

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
