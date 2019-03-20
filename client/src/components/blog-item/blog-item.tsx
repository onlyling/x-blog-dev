import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Styles from './blog-item.module.less';

interface TypeProps {}

class Node extends PureComponent<TypeProps> {
  render() {
    return (
      <article className={Styles['article']}>
        <div className={Styles['header']}>
          <div className={Styles['time']}>2011-11-11 11:11:11</div>
          <h2 className={Styles['title']}>这里是什么什么什么什么我也不清楚了</h2>
        </div>
        <div>
          <p>
            这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了这里是什么什么什么什么我也不清楚了
          </p>
          <p>
            <Link to="/blog/12">继续阅读</Link>
          </p>
        </div>
      </article>
    );
  }
}

export default Node;
