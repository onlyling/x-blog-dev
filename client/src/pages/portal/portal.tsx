import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from '@loadable/component';

import LayoutHome from '../../layouts/layout-home/layout-home';
import ErrorPage from '../../components/error-page/error-page';

import * as Utils from '../../utils';

import * as Store from '../../store';

const Page404: React.SFC = () => {
  return <ErrorPage code="404" />;
};

// 首页
const PageHome = Loadable(() => import('./home/home'));

// 用户中心
const PageUserCenter = Loadable(() => import('./user-center/user-center'));

// 日记
const PageBlog = Loadable(() => import('./blog/blog'));

// 设置
const PageSettings = Loadable(() => import('./settings/settings'));

const mapStateToProps = ({ User }: Store.iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = (Dispatch: any) => {
  const { User } = Dispatch as Store.Dispatch;
  return {
    UserLogout: User.GetUserLogout
  };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

@(connect(
  mapStateToProps,
  mapDispatchToProps
) as any)
class Node extends Component<Props, object> {
  render() {
    const { match, UserInfo, UserLogout } = this.props;
    const RootPath = Utils.getRootPath(match.path);

    return (
      <LayoutHome UserInfo={UserInfo} UserLogout={UserLogout}>
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
