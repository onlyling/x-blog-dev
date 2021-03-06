import React, { PureComponent } from 'react';

import { Form, Input, Button, notification, Modal } from 'antd';

import * as APICategory from '../../../api/category';

import { FormComponentProps } from 'antd/lib/form/Form';
import * as TypeModel from '../../../types/model';
import * as TypeParam from '../../../types/param';

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

type Props = FormComponentProps & {
  okCallBack?: (isEdit: boolean) => void;
  noCallBack?: Function;
};
type State = typeof initState;

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  showModal = (c: TypeModel.TypeCategoryModel) => {
    const {
      form: { setFieldsValue }
    } = this.props;
    setFieldsValue(
      !!c.id
        ? {
            id: c.id,
            name: c.name
          }
        : {
            id: '',
            name: ''
          }
    );

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
      form: { validateFieldsAndScroll },
      okCallBack,
      noCallBack
    } = self.props;

    validateFieldsAndScroll(async (err, values: TypeParam.TypeCategoryParam) => {
      if (err) {
        return false;
      }

      self.setState({
        fetching: true
      });

      const isEdit = !!values.id;
      const doAjax = isEdit ? APICategory.PutOne : APICategory.PostOne;
      const data = await doAjax(values);

      if (data.success) {
        notification.success({
          message: `${values.name} 类目已${isEdit ? '更新' : '添加'}`
        });
        self.hideModal();

        okCallBack && okCallBack(isEdit);
      } else {
        noCallBack && noCallBack();
      }

      self.setState({
        fetching: false
      });
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
