import React from 'react';

import { getParamBySearchString, parseObject2search, getPager } from '../../utils';

import { RouteComponentProps } from 'react-router-dom';
import { PaginationConfig } from 'antd/lib/pagination/Pagination';
import * as TypeGlobal from '../../types/global';

class Node<T> extends React.Component<T & RouteComponentProps> {
  /**
   * 表单数据
   */
  $__QueryData__: {
    [index: string]: any;
  } = {};

  /**
   * 是否是函数操作的，避免链接的进入，导致 $__QueryData__ 与 search 不同步
   */
  $isAction = false;

  /**
   * 初始化表单数据 刷新页面恢复已选表单数据
   */
  $initQueryData = () => {
    let { search } = this.props.location;
    let data = getParamBySearchString(search);
    this.$__QueryData__ = data;
  };

  /**
   * 获取表单数据
   */
  $getQueryData = (key?: string) => {
    if (key) {
      return this.$__QueryData__[key] || '';
    } else {
      return this.$__QueryData__;
    }
  };

  /**
   * 修改表单数据 同时更新 URL
   */
  $putQueryData = (key: string | TypeGlobal.TypeAnyObject, value?: any) => {
    this.$isAction = true;
    if (value) {
      this.$__QueryData__[key as string] = value;
    } else {
      if (Object.prototype.toString.call(key) === '[object Object]') {
        Object.keys(key).forEach((k: string) => {
          if ((key as TypeGlobal.TypeAnyObject)[k]) {
            this.$__QueryData__[k] = (key as TypeGlobal.TypeAnyObject)[k];
          } else {
            delete this.$__QueryData__[k];
          }
        });
      } else {
        delete this.$__QueryData__[key as string];
      }
    }
    // 修改 URL
    const { history } = this.props;
    history.push(`${history.location.pathname}${parseObject2search(this.$__QueryData__)}`);
  };

  $initPage = () => {};

  /**
   * 更新的时候初始化页面、重新获取数据
   */
  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.search !== prevProps.location.search) {
      if (!this.$isAction) {
        // 不是函数操作，更新
        this.$initQueryData();
      }
      this.$initPage();
      this.$isAction = false;
    }
  }

  /**
   * 获取通用的分页组件配置
   */
  $getPager = (data: TypeGlobal.TypePagerParam, isSorter: boolean = false) => {
    let self = this;
    return getPager(data, (page) => {
      if (isSorter) {
        return;
      }
      if (page == 1) {
        // 可能是洁癖在作祟
        page = '';
      }
      self.$putQueryData('pageNo', page);
    });
  };

  // 排序变化
  $sorterChange = (
    pagination: PaginationConfig,
    filters: any,
    sorter: {
      order?: any;
      field?: any;
    }
  ) => {
    const orderRule = sorter.order || '';
    const orderType = sorter.field || '';
    let pageNo = pagination.current;

    this.$putQueryData({
      orderRule,
      orderType,
      pageNo
    });
  };
}

export default Node;
