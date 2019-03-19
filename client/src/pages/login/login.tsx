import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import LoginRegister from '../../components/login-register/login-register';

class Node extends Component<RouteComponentProps> {
  render() {
    return <LoginRegister title="登录" isLogin />;
  }
}

export default Node;
