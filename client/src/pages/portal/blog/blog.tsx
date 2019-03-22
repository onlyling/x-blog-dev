import React, { Component } from 'react';

import BlogItem from '../../../components/blog-item/blog-item';

class Node extends Component {
  render() {
    return (
      <div>
        <BlogItem isFull />
      </div>
    );
  }
}

export default Node;
