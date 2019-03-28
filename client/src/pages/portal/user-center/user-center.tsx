import React, { Component } from 'react';

import { Row, Col, Card } from 'antd';

class Node extends Component {
  getUserInfo = () => {
    return <Card bordered={false}>2323</Card>;
  };

  render() {
    return (
      <Row gutter={20}>
        <Col span={6}>{this.getUserInfo()}</Col>
        <Col span={18}>
          <Card bordered={false}>23</Card>
        </Col>
      </Row>
    );
  }
}

export default Node;
