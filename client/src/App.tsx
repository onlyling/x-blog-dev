import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import Routes from './routes';
import { store } from './store';

import './App.less';

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
