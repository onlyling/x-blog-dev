import React, { PureComponent } from 'react';

type State = {
  hasError: boolean;
};

class Node extends PureComponent<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error | null, info: object) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default Node;
