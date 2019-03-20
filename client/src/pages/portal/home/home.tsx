import React, { Component } from 'react';

import BlogItem from '../../../components/blog-item/blog-item';

class Node extends Component {
  render() {
    return (
      <div>
        {[1, 2, 3].map((i) => {
          return <BlogItem key={i} />;
        })}
      </div>
    );
  }
}

export default Node;
