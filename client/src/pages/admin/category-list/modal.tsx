import React, { PureComponent } from 'react';

import { Form, Input, Button, message, Modal } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import * as TypeModel from '../../../types/model';

const FormItem = Form.Item;

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
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
      offset: 6
    }
  }
};

const initState = {
  modalShow: false,
  fetching: false,
  id: 0
};

type Props = FormComponentProps & {};
type State = typeof initState;

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  showModal = (c: TypeModel.TypeCategoryModel) => {
    this.setState({
      modalShow: true,
      id: c.id || 0
    });
  };

  hideModal = () => {
    this.setState({
      modalShow: false
    });
  };

  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const self = this;
    const {
      form: { validateFieldsAndScroll }
    } = self.props;

    validateFieldsAndScroll((err, values: TypeModel.TypeCategoryModel) => {
      if (err) {
        return false;
      }

      console.log(values);
    });
  };

  render() {
    const { fetching, modalShow, id } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Modal visible={modalShow} title={`${id === 0 ? '新增' : '编辑'}类目`} onCancel={this.hideModal} footer={null}>
        <Form {...FORM_ITEM_LAYOUT} onSubmit={this.handlerSubmit}>
          {getFieldDecorator('id', {})(<Input type="hidden" />)}

          <FormItem label="名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }]
            })(<Input type="name" />)}
          </FormItem>

          <FormItem {...TAI_FORM_ITEM_LAYOUT}>
            <Button type="primary" htmlType="submit" disabled={fetching}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(Node);
