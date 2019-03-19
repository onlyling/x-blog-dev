import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { Typography, Form, Icon, Input, Button } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';

import Styles from './login-register.module.less';

const FormItem = Form.Item;

interface TypeProps extends FormComponentProps {
  title: string;
  isLogin?: boolean;
}

class Node extends PureComponent<TypeProps> {
  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { title, isLogin, form } = this.props;
    const { getFieldDecorator } = form;
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
            <Button type="primary" htmlType="submit" block>
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

export default Form.create()(Node);
