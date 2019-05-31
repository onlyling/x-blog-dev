import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Card, Table, Tag } from 'antd';

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
    GetPager: Pager.GetBlogPager
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
    const columns: ColumnProps<TypeModel.TypeBlogModel>[] = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 80
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        render: (i) => {
          return i.name;
        }
      },
      {
        title: '分类',
        dataIndex: 'tags',
        key: 'tags',
        width: 180,
        render: (i) => {
          return i.map((t: TypeModel.TypeTagModel) => {
            return <Tag key={t.id}>{t.name}</Tag>;
          });
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
      <Card bordered={false} title="文章管理">
        <Table<TypeModel.TypeBlogModel>
          rowKey="id"
          columns={self.getColumns({
            order: queryData.orderRule || '',
            field: queryData.orderType || ''
          })}
          loading={Pager.isFetching}
          dataSource={Pager.BlogPager.list}
        />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
