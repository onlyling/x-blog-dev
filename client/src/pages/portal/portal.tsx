import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import LayoutHome from '../../layouts/layout-home/layout-home';
import LoadingComponent from '../../components/page-loading/page-loading';
import Page404 from '../../components/404/404';

import * as Utils from '../../utils';

import { iRootState, Dispatch } from '../../store';

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

// 日记
const PageBlog = Loadable({
  loader: () => import('./blog/blog'),
  loading: LoadingComponent
});

// 设置
const PageSettings = Loadable({
  loader: () => import('./settings/settings'),
  loading: LoadingComponent
});

const mapStateToProps = ({ User }: iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = ({  }: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

@(connect(
  mapStateToProps,
  mapDispatchToProps
) as any)
class Node extends Component<Props, object> {
  render() {
    const { match, UserInfo } = this.props;
    const RootPath = Utils.getRootPath(match.path);

    return (
      <LayoutHome UserInfo={UserInfo}>
        <Switch>
          <Route exact path={`${RootPath}/`} component={PageHome} />
          <Route exact path={`${RootPath}/category/:id`} component={PageHome} />
          <Route exact path={`${RootPath}/blog/:id`} component={PageBlog} />
          <Route path={`${RootPath}/user/:id`} component={PageUserCenter} />
          <Route path={`${RootPath}/settings`} component={PageSettings} />
          <Route component={Page404} />
        </Switch>
      </LayoutHome>
    );
  }
}

export default Node;
