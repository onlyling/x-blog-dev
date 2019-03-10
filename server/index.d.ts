import * as sequelize from 'sequelize';

type TypeModel = {
  User: sequelize.Model;
  Blog: sequelize.Model;
  Category: sequelize.Model;
  Tag: sequelize.Model;
  Comment: sequelize.Model;
};

declare module 'egg' {
  // extend app
  interface Application {
    Sequelize: sequelize.SequelizeStatic;
    model: TypeModel & sequelize.Sequelize;
  }
}
