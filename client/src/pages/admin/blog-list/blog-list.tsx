import React, { Component } from 'react';
import { Card } from 'antd';

class Node extends Component {
  render() {
    return (
      <Card bordered={false} title="文章管理">
        blog-list
      </Card>
    );
  }
}

export default Node;
