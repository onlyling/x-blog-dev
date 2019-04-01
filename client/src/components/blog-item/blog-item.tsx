import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import * as Utils from '../../utils';

import { TypeBlogModel } from '../../types/model';

import './github-markdown.css';
import Styles from './blog-item.module.less';

interface TypeProps {
  isFull?: boolean;
  blog: TypeBlogModel;
}

class Node extends PureComponent<TypeProps> {
  render() {
    const { isFull, blog } = this.props;
    const category = blog.category || {};
    const user = blog.user || {};
    const tags = blog.tags || [];
    const blogUrl = `/blog/${blog.id}`;

    return (
      <article className={Styles['article']}>
        <h2 className={Styles['title']}>
          <Link to={blogUrl} className={Styles['title-link']}>
            {blog.title}
          </Link>
        </h2>

        <p className={Styles['time']}>
          <span className={Styles['item']}>{Utils.formatTime(blog.created_at)}</span>

          <span className={Styles['item']}>
            by <Link to={`/user/${user.id}`}>{user.user_name}</Link>
          </span>

          <span className={Styles['item']}>
          <Link to={`/category/${blog.category_id}`}>{category.name}</Link>
          </span>

          <span className={Styles['item']}>
            {tags.map((item, i) => {
              return (
                <Fragment key={item.id}>
                  {i != 0 ? ', ' : ''}
                  <Link to={`/tag/${item.id}`}>{item.name}</Link>
                </Fragment>
              );
            })}
          </span>
        </p>

        {isFull ? (
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <Fragment>
            <p>{blog.content}</p>
            <p>
              <Link to={blogUrl}>继续阅读</Link>
            </p>
          </Fragment>
        )}
      </article>
    );
  }
}

export default Node;
