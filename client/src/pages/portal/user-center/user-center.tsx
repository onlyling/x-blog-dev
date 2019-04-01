import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { Row, Col, Card, Icon, Divider, Tag } from 'antd';
import * as Utils from '../../../utils';

import * as Store from '../../../store';

import Styles from './user-center.module.less';

import PageArticle from './article';

const mapStateToProps = ({ Pager }: Store.iRootState) => ({
  CurUser: Pager.CurUser
});

const PageIng = () => {
  return <div>ing</div>;
};

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Store.Dispatch;
  return {
    UpdateSomeCur: Pager.UpdateSomeCur
  };
};

type TypeMatchParams = {
  id: string;
};

interface NodeProps {}
interface State {
  key: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps<TypeMatchParams>;

// 个人中心可能会有的几个类目
const operationTabList = [
  {
    key: 'article',
    tab: '文章'
  },
  {
    key: 'other',
    tab: '其他'
  }
];

// 默认文字
const defaultText = (s: string | undefined, show?: any) => {
  return s ? s : show ? show : '暂无';
};

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    // 更新当前用户
    props.UpdateSomeCur({
      type: 'CurUser',
      params: props.match.params.id
    });

    this.state = {
      key: props.location.pathname.split('/').reverse()[0]
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { match, UpdateSomeCur } = this.props;
    if (match.url != prevProps.match.url) {
      // 更新用户信息；
      UpdateSomeCur({
        type: 'CurUser',
        params: match.params.id
      });
    }
  }

  getUserInfo = () => {
    const { CurUser } = this.props;

    return (
      <Card bordered={false}>
        <h3 className={Styles['user-name']}>{CurUser.user_name}</h3>

        <h4 className={Styles['describe']}>{CurUser.describe}</h4>

        <div className={Styles['detail']}>
          <p>
            <Icon type="smile" />
            {defaultText(CurUser.title)}
          </p>
          <p>
            <Icon type="team" />
            {defaultText(CurUser.company)}
          </p>
          <p>
            <Icon type="environment" />
            {defaultText(CurUser.location, '未知')}
          </p>
          <p>
            <Icon type="link" />
            {defaultText(CurUser.personal_web)}
          </p>
        </div>

        <Divider dashed />

        <div className={Styles['tags']}>
          <div className={Styles['title']}>标签</div>
          {CurUser.tag && (CurUser.tag || '').split(',').map((s: string) => {
            return <Tag key={s}>{s}</Tag>;
          })}
        </div>
      </Card>
    );
  };

  handlerTabChange = (key: string) => {
    const { history, match } = this.props;
    history.push(match.url + '/' + key);
    this.setState({
      key
    });
  };

  render() {
    const { key } = this.state;
    const { match, location } = this.props;
    const RootPath = Utils.getRootPath(match.path);

    return (
      <Row gutter={20}>
        <Col span={6}>{this.getUserInfo()}</Col>
        <Col span={18}>
          <Card bordered={false} tabList={operationTabList} onTabChange={this.handlerTabChange} activeTabKey={key}>
            <Switch>
              <Route exact path={`${RootPath}/article`} component={PageArticle} />
              <Route exact path={`${RootPath}/other`} component={PageIng} />
              <Route
                exact
                path={`${RootPath}/`}
                component={() => {
                  return <Redirect to={`${location.pathname}/article`} />;
                }}
              />
            </Switch>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
