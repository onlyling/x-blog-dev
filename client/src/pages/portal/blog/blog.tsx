import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Card } from 'antd';

import BlogItem from '../../../components/blog-item/blog-item';

import { iRootState, Dispatch } from '../../../store';

const mapStateToProps = ({ Pager, User }: iRootState) => ({
  CurBlog: Pager.CurBlog,
  UserInfo: User.UserInfo
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Dispatch;
  return {
    UpdateSomeCur: Pager.UpdateSomeCur
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

class Node extends Component<Props> {
  constructor(props: Props) {
    super(props);
    // 更新当前 blog
    props.UpdateSomeCur({
      type: 'CurBlog',
      params: props.match.params.id
    });
  }

  render() {
    const { CurBlog, UserInfo } = this.props;
    return (
      <Card bordered={false}>
        <BlogItem isFull blog={CurBlog} edit={CurBlog.user_id == UserInfo.id} />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
