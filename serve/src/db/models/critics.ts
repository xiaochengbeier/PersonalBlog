import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Blog, blogId } from './blog';
import type { User, userId } from './user';

export interface CriticsAttributes {
  criticId?: number;
  articleId: number;
  content: string;
  talker: number;
  ctime: Date;
  parent?: number;
}

export type criticsPk = "criticId";
export type criticsId = Critics[criticsPk];
export type criticsCreationAttributes = Optional<CriticsAttributes, criticsPk>;

export class Critics extends Model<CriticsAttributes, criticsCreationAttributes> implements CriticsAttributes {
  criticId!: number;
  articleId!: number;
  content!: string;
  talker!: number;
  ctime!: Date;
  parent?: number;

  // critics belongsTo blog
  getblog!: Sequelize.BelongsToGetAssociationMixin<Blog>;
  setblog!: Sequelize.BelongsToSetAssociationMixin<Blog, blogId>;
  createblog!: Sequelize.BelongsToCreateAssociationMixin<Blog>;
  // critics belongsTo user
  getuser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<User, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Critics {
    Critics.init({
    criticId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "评论表主键"
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "被评论文章id",
      references: {
        model: 'blog',
        key: 'blogId'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "评论内容"
    },
    talker: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "评论者",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:  new Date(),
      comment: "创建时间"
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "评论的父级做评论回复使用"
    }
  }, {
    sequelize,
    tableName: 'critics',
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
          { name: "criticId" },
        ]
      },
      {
        name: "foreign_aritcleId_critic",
        using: "BTREE",
        fields: [
          { name: "articleId" },
        ]
      },
      {
        name: "foreign_talk_critic",
        using: "BTREE",
        fields: [
          { name: "talker" },
        ]
      },
    ]
  });
  return Critics;
  }
}
