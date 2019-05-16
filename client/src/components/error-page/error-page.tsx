import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import Styles from './error-page.module.less';

type TypeCode = '403' | '404';

const MSG_MAP: {
  [index: string]: string;
} = {
  '404': '抱歉，你访问的页面不存在',
  '403': '抱歉，你无权访问此页面'
};

type Props = {
  msg?: any;
  code: TypeCode;
};

const Node: React.SFC<Props> = ({ code, msg }) => {
  return (
    <div className={Styles['error-page']}>
      <div className={`error-icon icon-${code}`} />
      <div>
        <h3 className={Styles['code']}>{code}</h3>
        <p className={Styles['msg']}>{msg ? msg : MSG_MAP[code]}</p>
        <p>
          <Button type="primary">
            <Link to="/">返回首页</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Node;
