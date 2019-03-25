import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Spin } from 'antd';
import BlogItem from '../../../components/blog-item/blog-item';

import { iRootState, Dispatch } from '../../../store';

const mapStateToProps = ({ Pager }: iRootState) => ({
  Pager: Pager
});

const mapDispatchToProps = (Dispatch: any) => {
  const { Pager } = Dispatch as Dispatch;
  return {
    GetPager: Pager.GetBlogPager
  };
};

interface NodeProps {}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  NodeProps &
  RouteComponentProps;

class Node extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { GetPager } = this.props;
    GetPager({});
  };

  render() {
    const { Pager } = this.props;

    return (
      <div>
        {Pager.isFetching ? <Spin /> : ''}
        {(Pager.BlogPager.list || []).map((item) => {
          return <BlogItem key={item.id} blog={item} />;
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
