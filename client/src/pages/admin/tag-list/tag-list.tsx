import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Card, Table, Divider, Button, Modal, notification } from 'antd';
import BaseList, { TypeQueryData } from '../../../components/base-list/base-list';
import ModalInput from './modal';

import * as Utils from '../../../utils';
import * as APICategory from '../../../api/category';

import { ColumnProps } from 'antd/lib/table';
import * as TypeModel from '../../../types/model';
import * as Store from '../../../store';

const mapStateToProps = ({ Pager }: Store.iRootState) => ({
  Pager: Pager
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Store.Dispatch;
  return {
    GetPager: Pager.GetTagPager
  };
};

interface NodeProps {}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps;

class Node extends BaseList<Props> {
  constructor(props: Props) {
    super(props);
    this.Modal = React.createRef();
  }

  componentDidMount() {
    this.$initQueryData();
    this.$initPage();
  }

  Modal: any;

  $initPage = () => {
    const { GetPager } = this.props;
    let params = this.$getQueryData();
    // TODO 筛选搜索参数

    GetPager(params);
  };

  getColumns = ({ order = '', field = '' }) => {
    const columns: ColumnProps<TypeModel.TypeCategoryModel>[] = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 80
      },
      {
        title: '标题',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 160,
        render: (i, item) => {
          return (
            <React.Fragment>
              <a onClick={this.onShowModal(item)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={this.onDelete(item)}>删除</a>
            </React.Fragment>
          );
        }
      }
    ];

    return columns;
  };

  onShowModal = (c: TypeModel.TypeCategoryModel) => {
    const self = this;
    return () => {
      self.Modal.showModal(c);
    };
  };

  onModalSuccess = (isEdit: boolean) => {
    const self = this;
    const queryData: TypeQueryData = self.$getQueryData();

    if (!isEdit) {
      if (!!queryData.curpage && queryData.curpage > 1) {
        queryData.curpage = '';
        self.$putQueryData(queryData);
      }
    }

    self.$initPage();
  };

  onDelete = (item: TypeModel.TypeCategoryModel) => {
    const self = this;
    const cName = item.name;

    return () => {
      Modal.confirm({
        title: '提示',
        content: `真的要删除 ${cName} 吗？`,
        onOk: async () => {
          const data = await APICategory.DeleteOne(item.id);

          if (data.success) {
            self.$initPage();

            notification.success({
              message: `${cName} 已删除`
            });
          }
        }
      });
    };
  };

  render() {
    const self = this;
    const queryData = self.$getQueryData();
    const { Pager } = self.props;

    return (
      <Card
        bordered={false}
        title="标签管理"
        extra={
          <Button type="primary" onClick={this.onShowModal({} as TypeModel.TypeCategoryModel)}>
            新增类目
          </Button>
        }
      >
        <Table<TypeModel.TypeCategoryModel>
          rowKey="id"
          columns={self.getColumns({
            order: queryData.orderRule || '',
            field: queryData.orderType || ''
          })}
          loading={Pager.isFetching}
          dataSource={Pager.TagPager.list}
          pagination={self.$getPager(Pager.TagPager, false)}
        />
        <ModalInput wrappedComponentRef={(form: any) => (this.Modal = form)} okCallBack={self.onModalSuccess} />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
