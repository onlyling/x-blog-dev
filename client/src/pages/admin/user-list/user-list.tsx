import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Card, Table, Tag } from 'antd';
import BaseList from '../../../components/base-list/base-list';

import * as Utils from '../../../utils';

import { ColumnProps } from 'antd/lib/table';
import * as TypeModel from '../../../types/model';
import * as Store from '../../../store';

const mapStateToProps = ({ Pager }: Store.iRootState) => ({
  Pager: Pager
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Store.Dispatch;
  return {
    GetPager: Pager.GetUserPager
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
    const columns: ColumnProps<TypeModel.TypeUserModel>[] = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '简介',
        dataIndex: 'describe',
        key: 'describe',
        width: 280
      },
      {
        title: '职位',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '坐标',
        dataIndex: 'location',
        key: 'location'
      },
      {
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
        width: 280,
        render: (i) => {
          if (!!!i) {
            return '-';
          }

          return i.split(',').map((t: string) => {
            return <Tag key={t}>{t}</Tag>;
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
      <Card bordered={false} title="用户管理">
        <Table<TypeModel.TypeUserModel>
          scroll={{ x: 1800 }}
          rowKey="id"
          columns={self.getColumns({
            order: queryData.orderRule || '',
            field: queryData.orderType || ''
          })}
          loading={Pager.isFetching}
          dataSource={Pager.UserPager.list}
          pagination={self.$getPager(Pager.UserPager, false)}
        />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
