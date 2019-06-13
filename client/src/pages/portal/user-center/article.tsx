import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Table, Tag } from 'antd';
import BaseList from '../../../components/base-list/base-list';

import * as Utils from '../../../utils';

import { ColumnProps } from 'antd/lib/table';
import * as Store from '../../../store';
import * as TypeModel from '../../../types/model';

const mapStateToProps = ({ Pager }: Store.iRootState) => ({
  Pager: Pager
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Store.Dispatch;
  return {
    GetPager: Pager.GetBlogPager
  };
};

type TypeMatchParams = {
  id: string;
};

interface NodeProps {}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps<TypeMatchParams>;

class Node extends BaseList<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount = () => {
    const self = this;

    self.$initQueryData();
    self.$initPage();
  };

  $initPage = () => {
    const {
      GetPager,
      match: { params }
    } = this.props;
    let queryData = this.$getQueryData();

    GetPager({
      ...queryData,
      user_id: params.id
    });
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
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        width: 180,
        render: (i) => {
          return i.map((t: TypeModel.TypeTagModel) => {
            return <Tag key={t.id}>{t.name}</Tag>;
          });
        }
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
        width: 120,
        render: (i) => {
          return Utils.formatTime(i);
        }
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 120,
        render: (i) => {
          return Utils.formatTime(i);
        }
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (i, item) => {
          return (
            <React.Fragment>
              <Link to={`/blog/${item.id}`}>查看</Link>
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
      <Table<TypeModel.TypeBlogModel>
        scroll={{ x: 1500 }}
        rowKey="id"
        columns={self.getColumns({
          order: queryData.orderRule || '',
          field: queryData.orderType || ''
        })}
        loading={Pager.isFetching}
        dataSource={Pager.BlogPager.list}
        pagination={self.$getPager(Pager.BlogPager, false)}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
