import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

@(withRouter as any)
class ScrollToTop extends React.Component<RouteComponentProps, object> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
