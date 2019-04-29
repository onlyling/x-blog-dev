import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Card, Form, Input, Button, message } from 'antd';
import * as ApiUser from '../../../api/user';

import { FormComponentProps } from 'antd/lib/form/Form';

import * as Store from '../../../store';
import * as TypeParam from '../../../types/param';

const FormItem = Form.Item;

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  }
};

const TAI_FORM_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 4
    }
  }
};

const initState = {
  fetching: false
};

const mapStateToProps = ({ User }: Store.iRootState) => ({
  UserInfo: User.UserInfo
});

const mapDispatchToProps = (Dispatch: any) => {
  // const { User } = Dispatch as Store.Dispatch;
  return {};
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & FormComponentProps;
type State = typeof initState;

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const self = this;
    const {
      form: { validateFieldsAndScroll, setFieldsValue }
    } = self.props;

    validateFieldsAndScroll(async (err, values: TypeParam.TypeUserNewPasswordParam) => {
      if (err) {
        return false;
      }

      if (values.new_2_password != values.new_password) {
        return message.error('两次输入的新密码不一致');
      }

      self.setState({
        fetching: true
      });

      const data = await ApiUser.PutUserPassword(values);

      if (data.success) {
        message.success('操作成功');

        setFieldsValue({
          password: '',
          new_password: '',
          new_2_password: ''
        });
      }

      self.setState({
        fetching: false
      });
    });
  };

  render() {
    const { fetching } = this.state;
    const {
      form: { getFieldDecorator },
      UserInfo
    } = this.props;

    return (
      <Card bordered={false} title="安全设置">
        <Form {...FORM_ITEM_LAYOUT} onSubmit={this.handlerSubmit}>
          {getFieldDecorator('id', {
            initialValue: UserInfo.id
          })(<Input type="hidden" />)}

          <FormItem label="旧密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入旧密码' }]
            })(<Input type="password" />)}
          </FormItem>

          <FormItem label="新密码">
            {getFieldDecorator('new_password', {
              rules: [{ required: true, message: '请输入新密码' }]
            })(<Input type="password" />)}
          </FormItem>

          <FormItem label="确认新密码">
            {getFieldDecorator('new_2_password', {
              rules: [{ required: true, message: '请再次输入新密码' }]
            })(<Input type="password" />)}
          </FormItem>

          <FormItem {...TAI_FORM_ITEM_LAYOUT}>
            <Button type="primary" htmlType="submit" disabled={fetching}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Node));
