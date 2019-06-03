import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Card, Table, Divider } from 'antd';

import BaseList from '../../../components/base-list/base-list';

import { ColumnProps } from 'antd/lib/table';
import * as TypeModel from '../../../types/model';
import * as Store from '../../../store';

const mapStateToProps = ({ Pager }: Store.iRootState) => ({
  Pager: Pager
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Store.Dispatch;
  return {
    GetPager: Pager.GetCategoryPager
  };
};

interface NodeProps {}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps;

class Node extends BaseList<Props> {
  componentDidMount() {
    this.$initQueryData();
    this.$initPage();
  }

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
        width: 200,
        render: (i, item) => {
          return (
            <React.Fragment>
              <Link to={`/category/${item.id}`}>查看文章</Link>
              <Divider type="vertical" />
              <a>编辑</a>
              <Divider type="vertical" />
              <a>删除</a>
            </React.Fragment>
          );
        }
      }
    ];

    return columns;
  };

  render() {
    const self = this;
    const queryData = self.$getQueryData();
    const { Pager } = self.props;

    return (
      <Card bordered={false} title="类目管理">
        <Table<TypeModel.TypeCategoryModel>
          rowKey="id"
          columns={self.getColumns({
            order: queryData.orderRule || '',
            field: queryData.orderType || ''
          })}
          loading={Pager.isFetching}
          dataSource={Pager.CategoryPager.list}
          pagination={self.$getPager(Pager.CategoryPager, false)}
        />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
