import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { TypeBlogModel } from '../../types/model';

import './github-markdown.css';
import Styles from './blog-item.module.less';

interface TypeProps {
  isFull?: boolean;
  blog: TypeBlogModel;
}

const TEST_HTML = `
    <h1 id="-js-sdk-">前端 JS-SDK 接入</h1><h2 id="-js-sdk-">引入远程 JS-SDK 代码</h2><blockquote><p>同步加载</p></blockquote><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://10.255.67.67:35001/js-sdk/dist/select-dna.0.0.1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><blockquote><p>异步加载</p></blockquote><pre><code class="language-javascript"><span class="hljs-keyword">const</span> LoadJSSDK = () =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.SelectDNA) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    s.type = <span class="hljs-string">'text/javascript'</span>;
    s.<span class="hljs-keyword">async</span> = <span class="hljs-keyword">true</span>;
    s.src = <span class="hljs-string">'http://10.255.67.67:35001/js-sdk/dist/select-dna.0.0.1.js'</span>;
    <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'script'</span>)[<span class="hljs-number">0</span>];
    x.parentNode.insertBefore(s, x);
};

LoadJSSDK();</code></pre><h2 id="-">使用示例</h2><blockquote><p>编辑模式</p></blockquote><pre><code class="language-javascript"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">SelectDNA</span>({
    <span class="hljs-attribute">view</span>: <span class="hljs-string">'#j-dna-view'</span>,
    <span class="hljs-attribute">data</span>: [],
    <span class="hljs-attribute">reqNo</span>: <span class="hljs-string">'asdssda1121'</span>,
    <span class="hljs-attribute">timestemp</span>: <span class="hljs-string">'1538049609000'</span>,
    <span class="hljs-attribute">sign</span>: <span class="hljs-string">'86cd8c49c28d4a8182cbaa46b5da367c'</span>,
    <span class="hljs-attribute">merchantCode</span>: <span class="hljs-string">'12138'</span>,
    <span class="hljs-attribute">onDataChange</span>: function(data){
        console.log(data);
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(JSON.stringify(data));
    }
});</code></pre><ul><li><code>view</code> jQuery 的选择器，用于呈现客户树</li><li><code>data</code> 已存在的客户关系树</li><li><code>reqNo</code> 签名用到的请求号</li><li><code>timestemp</code> 签名用到的时间戳</li><li><code>sign</code> 签名后的数据</li><li><code>merchantCode</code> 客户的 code</li><li><code>onDataChange</code> 更新客户树后的回调</li></ul><p>调用 DNA 选择弹窗前，会对对当前客户进行校验，避免出现越权的现象。</p><p>调用 JS-SDK 前，需做好签名准备。</p><blockquote><p>查看模式</p></blockquote><pre><code class="language-javascript"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">SelectDNA</span>({
    <span class="hljs-attribute">view</span>: <span class="hljs-string">'#view'</span>,
    <span class="hljs-attribute">readOnly</span>: true,
    <span class="hljs-attribute">data</span>: [{<span class="hljs-string">"parentId"</span>:<span class="hljs-number">0</span>,<span class="hljs-string">"calcType"</span>:<span class="hljs-string">"="</span>,<span class="hljs-string">"columnNum"</span>:<span class="hljs-number">59</span>,<span class="hljs-string">"columnName"</span>:<span class="hljs-string">"微信推广1"</span>,<span class="hljs-string">"permitFeature"</span>:<span class="hljs-string">"M"</span>,<span class="hljs-string">"featureValues"</span>:<span class="hljs-string">"大于1112"</span>,<span class="hljs-string">"id"</span>:<span class="hljs-number">87322917</span>,<span class="hljs-string">"hasChildren"</span>:true}]
});</code></pre><ul><li><code>view</code> jQuery 的选择器，用于呈现客户树</li><li><code>data</code> 已存在的客户关系树</li><li><code>readOnly</code> 只读</li></ul>
    `;

class Node extends PureComponent<TypeProps> {
  render() {
    const { isFull, blog } = this.props;
    const blogUrl = `/blog/${blog.id}`;

    return (
      <article className={Styles['article']}>
        <h2 className={Styles['title']}>
          <Link to={blogUrl} className={Styles['title-link']}>
            {blog.title}
          </Link>
        </h2>

        <p className={Styles['time']}>
          <span className={Styles['item']}>{blog.created_at}</span>
          <span className={Styles['item']}>
            <Link to={`/category/${blog.category_id}`}>{blog.category.name}</Link>
          </span>

          <span className={Styles['item']}>
            {blog.tags.map((item, i) => {
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
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: TEST_HTML }} />
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
