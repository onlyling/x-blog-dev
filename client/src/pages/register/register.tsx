import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import LoginRegister from '../../components/login-register/login-register';

class Node extends Component<RouteComponentProps> {
  render() {
    return <LoginRegister title="注册" />;
  }
}

export default Node;
