This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Rematch 问题汇总

### mapDispatchToProps

在路由级组件中使用过 connect 注入属性，可以如下使用，不会报错。

```typescript
const mapDispatchToProps = ({ User }: Dispatch) => {
  return {
    PostLogin: User.PostLogin
  };
};

@(connect(
  mapStateToProps,
  mapDispatchToProps
) as any)
class Node extends Component<Props, object> {}
```

只是一个组件的时候，需要额外注意，不能使用装饰器，`mapDispatchToProps` 也要适配一下。

```typescript
const mapDispatchToProps = (Dispatch: any) => {
  const { User } = Dispatch as Dispatch;
  return {
    PostLogin: User.PostLogin
  };
};

class Node extends Component<Props, object> {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
```

这个问题花了大半天的时间。

### Effects return values

在 JavaScript 环境中，Effects 可以直接返回一个 Promise 对象，TypeScript 貌似暂时不能。

[How to use Rematch Type definitions for Effects that return values?](https://github.com/rematch/rematch/issues/609)

这个问题有点麻烦。
