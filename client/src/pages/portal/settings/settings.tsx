import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { Menu } from 'antd';
import * as Utils from '../../../utils';

import { ClickParam } from 'antd/lib/menu';

import Styles from './settings.module.less';

import BaseSttings from './base-settings';
import SecuritySttings from './security-settings';

const MenuItem = Menu.Item;

// 建设中
const PageIng = () => {
  return <div>ing</div>;
};

// 所有的设置导航
const NAV_LIST = [
  {
    url: 'base',
    title: '基本设置',
    component: BaseSttings
  },
  {
    url: 'security',
    title: '安全设置',
    component: SecuritySttings
  },
  {
    url: 'other',
    title: '其他设置',
    component: PageIng
  }
];

interface NodeProps {}
interface State {
  key: string;
}

type Props = NodeProps & RouteComponentProps;

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      key: props.location.pathname.split('/').reverse()[0]
    };
  }

  componentDidUpdate(prevProps: Props) {
    // 用户中心跳转到文章的时候，避免没有选中状态
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.setState({
        key: this.props.location.pathname.split('/').reverse()[0]
      });
    }
  }

  // 导航栏 HTML
  getNavHTML = () => {
    const { key } = this.state;

    return (
      <div className={Styles['settings-nav']}>
        <Menu mode="inline" selectedKeys={[key]} onClick={this.handlerSwitchNav}>
          {NAV_LIST.map((item) => {
            return <MenuItem key={item.url}>{item.title}</MenuItem>;
          })}
        </Menu>
      </div>
    );
  };

  // 切换导航的回调
  handlerSwitchNav = (e: ClickParam) => {
    const { history, location } = this.props;
    history.push(`/${location.pathname.split('/')[1]}/${e.key}`);
  };

  render() {
    const { match, location } = this.props;
    const RootPath = Utils.getRootPath(match.path);

    return (
      <div className={Styles['settings-box']}>
        {this.getNavHTML()}
        <div className={Styles['settings-ctx']}>
          <Switch>
            {NAV_LIST.map((item) => {
              return <Route exact key={item.url} path={`${RootPath}/${item.url}`} component={item.component} />;
            })}
            <Route
              exact
              path={`${RootPath}/`}
              component={() => {
                return <Redirect to={`${location.pathname}/${NAV_LIST[0].url}`} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Node;
