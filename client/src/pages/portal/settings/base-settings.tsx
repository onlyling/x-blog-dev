import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Card, Form, Input, Button, message } from 'antd';
import * as APIUser from '../../../api/user';

import { FormComponentProps } from 'antd/lib/form/Form';

import * as Store from '../../../store';

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
  const { User } = Dispatch as Store.Dispatch;
  return {
    UpdateUserInfo: User.UpdateUserInfo
  };
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
      form: { validateFieldsAndScroll },
      UpdateUserInfo
    } = self.props;

    validateFieldsAndScroll(async (err, values) => {
      if (err) {
        return;
      }

      self.setState({
        fetching: true
      });

      const data = await APIUser.PutUserInfo(values);
      if (data.success) {
        UpdateUserInfo(data.data);
        message.success('操作成功');
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
      <Card bordered={false} title="基本设置">
        <Form {...FORM_ITEM_LAYOUT} onSubmit={this.handlerSubmit}>
          {getFieldDecorator('id', {
            initialValue: UserInfo.id
          })(<Input type="hidden" />)}

          <FormItem label="用户名">
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入用户名' }],
              initialValue: UserInfo.user_name
            })(<Input />)}
          </FormItem>

          <FormItem label="个人描述">
            {getFieldDecorator('describe', {
              initialValue: UserInfo.describe
            })(<Input />)}
          </FormItem>

          <FormItem label="职位">
            {getFieldDecorator('title', {
              initialValue: UserInfo.title
            })(<Input />)}
          </FormItem>

          <FormItem label="公司">
            {getFieldDecorator('company', {
              initialValue: UserInfo.company
            })(<Input />)}
          </FormItem>

          <FormItem label="城市">
            {getFieldDecorator('location', {
              initialValue: UserInfo.location
            })(<Input />)}
          </FormItem>

          <FormItem label="个人站点">
            {getFieldDecorator('personal_web', {
              initialValue: UserInfo.personal_web
            })(<Input />)}
          </FormItem>

          <FormItem label="标签">
            {getFieldDecorator('tag', {
              initialValue: UserInfo.tag
            })(<Input />)}
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
