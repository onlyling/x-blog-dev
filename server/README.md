# x-blog-server

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

## egg-ts-helper 自动添加的申明生效

使用 `export default {}` 的方式向外暴露属性。

如果 `exports const a = () => {}` 这样的形式，虽然不会报错，但编辑器不会有提示。

## sequelize model 规范定义

```typescript
import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeTagAttributes {
  id?: number;
  name: string;
}

type TypeTagInstance = sequelize.Instance<TypeTagAttributes> & TypeTagAttributes;

type TypeTageModel = sequelize.Model<TypeTagInstance, TypeTagAttributes>;

const initModel = (app: Application): TypeTageModel => {
  const { STRING, INTEGER } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeTagAttributes> = {
    // ID
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 名称
    name: {
      type: STRING,
      allowNull: false,
      validate: {}
    }
  };
  /**
   * 标签表
   */
  const Instance = app.model.define<TypeTagInstance, TypeTagAttributes>('tag', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Tag.belongsToMany(app.model.Blog, {
      through: 'blog_tag'
    });
  };

  return Instance;
};

export default initModel;
```

`SequelizeAttributes` 已经在 `app/typings/types.d.ts` 全局声明了。

参考文章：[So you want to use Typescript with Sequelize?](https://vivacitylabs.com/setup-typescript-sequelize/)
