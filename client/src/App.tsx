import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import Routes from './routes';
import { store } from './store';
import * as ApiUser from './api/user';

import './App.less';

ApiUser.GetUserLogined().then((data) => {
  const { UpdateUserInfo } = store.dispatch.User;
  if (data.success) {
    UpdateUserInfo(data.data);
  } else {
    UpdateUserInfo({});
  }
});

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </LocaleProvider>
    );
  }
}

export default App;
