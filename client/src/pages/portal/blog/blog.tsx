import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import BlogItem from '../../../components/blog-item/blog-item';

import { iRootState, Dispatch } from '../../../store';

const mapStateToProps = ({ Pager }: iRootState) => ({
  Pager: Pager
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
    const { Pager } = this.props;
    return (
      <div>
        <BlogItem isFull blog={Pager.CurBlog} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
