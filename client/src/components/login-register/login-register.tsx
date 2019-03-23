import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Typography, Form, Icon, Input, Button } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import { iRootState, Dispatch } from '../../store';

import Styles from './login-register.module.less';

const FormItem = Form.Item;

const mapStateToProps = ({ User }: iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = ({ User }: any) => ({
  PostLogin: User.PostLogin
});

const initState = {
  fetching: false
};

interface NodeProps extends FormComponentProps {
  title: string;
  isLogin?: boolean;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & NodeProps;

class Node extends PureComponent<Props, typeof initState> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { form, PostLogin, isLogin } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ fetching: true });

        console.log('Received values of form: ', values);

        const doFetch = isLogin ? PostLogin : PostLogin;
        await doFetch(values);

        this.setState({ fetching: false });
      }
    });
  };

  render() {
    const { fetching } = this.state;
    const { title, isLogin, form, UserInfo } = this.props;
    const { getFieldDecorator } = form;
    if (UserInfo.id) {
      return <Redirect to="/" />;
    }
    return (
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
              {!isLogin ? '注册' : '登录'}
            </Button>
          </Form.Item>

          <p>
            <Link className="pull-left" to="/">
              返回首页
            </Link>
            <Link className="pull-right" to={isLogin ? '/register' : '/login'}>
              立即{isLogin ? '注册' : '登录'}
            </Link>
          </p>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Node));
