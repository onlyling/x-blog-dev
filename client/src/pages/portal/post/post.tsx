import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Spin, Card, Form, Input, Button, Select, Checkbox, message } from 'antd';
import * as ApiBlog from '../../../api/blog';

import { FormComponentProps } from 'antd/lib/form/Form';
import * as Store from '../../../store';
import * as TypeParam from '../../../types/param';
import * as TypeModel from '../../../types/model';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const mapStateToProps = ({ Category, Tag, Pager }: Store.iRootState) => ({
  Categorys: Category.Categorys,
  Tags: Tag.Tags,
  CurBlog: Pager.CurBlog
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Category, Tag, Pager } = Dispatch as Store.Dispatch;
  return {
    GetAllCategory: Category.GetAll,
    GetAllTag: Tag.GetAll,
    UpdateSomeCur: Pager.UpdateSomeCur
  };
};

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
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

type TypeMatchParams = {
  id: string;
};

interface NodeProps {}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps<TypeMatchParams> &
  FormComponentProps;
type State = {
  fetching: boolean;
  isEdit: boolean;
};

class Node extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const id = props.match.params.id;

    this.state = {
      fetching: false,
      isEdit: !!id

    };

    if (id) {
      // 更新当前 blog
      this.initPage(id);
    }
  }

  componentDidMount() {
    const { GetAllCategory, GetAllTag } = this.props;
    GetAllCategory();
    GetAllTag();
  }

  componentDidUpdate(prevProps: Props) {
    const id = this.props.match.params.id;
    if (id != prevProps.match.params.id && !!id) {
      this.initPage(id);
    }
    this.setState({
      isEdit: !!id
    });
  }

  initPage = (id: number | string) => {
    const { UpdateSomeCur } = this.props;
    UpdateSomeCur({
      type: 'CurBlog',
      params: id
    });
  };

  handlerSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const self = this;
    const {
      form: { validateFieldsAndScroll },
      history
    } = self.props;

    validateFieldsAndScroll(async (err, values: TypeParam.TypeBlogParam) => {
      if (err) {
        return;
      }

      self.setState({
        fetching: true
      });

      const doAjax = values.id ? ApiBlog.PutBlog : ApiBlog.PostBlog;
      const data = await doAjax(values);

      if (data.success) {
        message.success('操作成功');
        history.push(`/blog/${data.data.id}`);
      } else {
        self.setState({
          fetching: false
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      Categorys,
      Tags,
      CurBlog
    } = this.props;
    const { fetching, isEdit } = this.state;
    const __CurBlog: TypeModel.TypeBlogModel = isEdit ? CurBlog : ({} as TypeModel.TypeBlogModel);

    return (
      <Card bordered={false}>
        <Form {...FORM_ITEM_LAYOUT} onSubmit={this.handlerSubmit}>
          {getFieldDecorator('id', {
            initialValue: __CurBlog.id
          })(<Input type="hidden" />)}

          <FormItem label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章标题' }],
              initialValue: __CurBlog.title
            })(<Input />)}
          </FormItem>

          <FormItem label="分类">
            {getFieldDecorator('category_id', {
              rules: [{ required: true, message: '请选择分类' }],
              initialValue: __CurBlog.category_id ? CurBlog.category_id + '' : null
            })(
              <Select>
                {Categorys.map((c) => {
                  return <Option key={c.id}>{c.name}</Option>;
                })}
              </Select>
            )}
          </FormItem>

          <FormItem label="标签">
            {getFieldDecorator('tags', {
              rules: [{ required: true, message: '请选择标签' }],
              initialValue: (__CurBlog.tags || []).map((t) => t.id)
            })(<CheckboxGroup options={Tags.map((t) => ({ label: t.name, value: t.id }))} />)}
          </FormItem>

          <FormItem {...TAI_FORM_ITEM_LAYOUT}>
            {getFieldDecorator('markdown_content', {
              rules: [{ required: true, message: '请输入文章内容' }],
              initialValue: __CurBlog.markdown_content
            })(<Input.TextArea style={{ minHeight: 400 }} />)}
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
