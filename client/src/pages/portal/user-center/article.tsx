import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

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
    return <div>43434</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);
