import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

import { Typography, Form, Icon, Input, Button, message } from 'antd';
import * as ApiUser from '../../api/user';

import { FormComponentProps } from 'antd/lib/form/Form';
import * as Store from '../../store';

import Styles from './login-register.module.less';

const FormItem = Form.Item;

/**
 * 获取文案
 * @param isLogin
 */
const getCopywriter = (isLogin: boolean | undefined): string => {
  return isLogin ? '登录' : '注册';
};

const mapStateToProps = ({ User }: Store.iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = (Dispatch: any) => {
  const { User } = Dispatch as Store.Dispatch;
  return {
    UpdateUserInfo: User.UpdateUserInfo
  };
};

const initState = {
  fetching: false
};

interface NodeProps {
  title: string;
  isLogin?: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps &
  FormComponentProps;

class Node extends PureComponent<Props, typeof initState> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }
  // 登录
  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { form, UpdateUserInfo, isLogin, history } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ fetching: true });
        const doFetch = isLogin ? ApiUser.PostLogin : ApiUser.PostRegister;
        const data = await doFetch(values);

        this.setState({ fetching: false });

        if (data.success) {
          message.success(`成功${getCopywriter(isLogin)}`);
          // 更新当前登录人信息
          UpdateUserInfo(data.data);
          // 跳转页面
          history.push('/');
        }
      }
    });
  };

  render() {
    const { fetching } = this.state;
    const { title, isLogin, form, UserInfo } = this.props;
    const { getFieldDecorator } = form;
    if (UserInfo.id && isLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div className={Styles['page']}>
        <div className={Styles['form-box']}>
          <Form onSubmit={this.handlerSubmit}>
            <Typography.Title level={3} className="text-center">
              {title}
            </Typography.Title>

            <FormItem>
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请输入用户名吗' }]
              })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(<Input prefix={<Icon type="lock" />} placeholder="密码" type="password" />)}
            </FormItem>

            <Form.Item>
              <Button type="primary" htmlType="submit" block disabled={fetching}>
                {getCopywriter(isLogin)}
              </Button>
            </Form.Item>

            <p>
              <Link className="pull-left" to="/">
                返回首页
              </Link>
              <Link className="pull-right" to={isLogin ? '/register' : '/login'}>
                立即{getCopywriter(!isLogin)}
              </Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create()(Node))
);
