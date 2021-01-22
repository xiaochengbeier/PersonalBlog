import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Atmaping, atmapingId } from './atmaping';
import type { Critics, criticsId } from './critics';
import type { User, userId } from './user';

export interface BlogAttributes {
  blogId?: number;
  userId?: number;
  title: string;
  content: string;
  tag: string;
  likes?: number;
  ctime?: Date;
  reads?: number;
}

export type blogPk = "blogId";
export type blogId = Blog[blogPk];
export type blogCreationAttributes = Optional<BlogAttributes, blogPk>;

export class Blog extends Model<BlogAttributes, blogCreationAttributes> implements BlogAttributes {
  blogId?: number;
  userId!: number;
  title!: string;
  content!: string;
  tag!: string;
  likes?: number;
  ctime!: Date;
  reads?: number;

  // blog hasMany atmaping
  getatmapings!: Sequelize.HasManyGetAssociationsMixin<Atmaping>;
  setatmapings!: Sequelize.HasManySetAssociationsMixin<Atmaping, atmapingId>;
  addatmaping!: Sequelize.HasManyAddAssociationsMixin<Atmaping, atmapingId>;
  removeatmaping!: Sequelize.HasManyRemoveAssociationsMixin<Atmaping, atmapingId>;
  hasatmaping!: Sequelize.HasManyHasAssociationsMixin<Atmaping, atmapingId>;
  countatmapings!: Sequelize.HasManyCountAssociationsMixin;
  // blog belongsTo user
  getuser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<User, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  // blog hasMany critics
  getcritics!: Sequelize.HasManyGetAssociationsMixin<Critics>;
  setcritics!: Sequelize.HasManySetAssociationsMixin<Critics, criticsId>;
  addcritics!: Sequelize.HasManyAddAssociationsMixin<Critics, criticsId>;
  removecritics!: Sequelize.HasManyRemoveAssociationsMixin<Critics, criticsId>;
  hascritics!: Sequelize.HasManyHasAssociationsMixin<Critics, criticsId>;
  countcritics!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Blog {
    Blog.init({
    blogId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "博客表主键"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "博客标题"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "博客内容"
    },
    tag: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "博客标签"
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:10,
      comment: "博客点赞数量"
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "博客创建时间"
    },
    reads: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:10,
      comment: "博客阅读量"
    }
  }, {
    sequelize,
    tableName: 'blog',
    timestamps: true,
    paranoid:true,
    updatedAt:true,
    deletedAt:true,
    createdAt:true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "blogId" },
        ]
      },
      {
        name: "foreign_userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  return Blog;
  }
}
