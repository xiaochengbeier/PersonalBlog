import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Blog, blogId } from './blog';
import type { Tag, tagId } from './tag';

export interface AtmapingAttributes {
  atmId: number;
  articleId: number;
  tagId: number;
}

export type atmapingPk = "atmId";
export type atmapingId = Atmaping[atmapingPk];
export type atmapingCreationAttributes = Optional<AtmapingAttributes, atmapingPk>;

export class Atmaping extends Model<AtmapingAttributes, atmapingCreationAttributes> implements AtmapingAttributes {
  atmId!: number;
  articleId!: number;
  tagId!: number;

  // atmaping belongsTo blog
  getblog!: Sequelize.BelongsToGetAssociationMixin<Blog>;
  setblog!: Sequelize.BelongsToSetAssociationMixin<Blog, blogId>;
  createblog!: Sequelize.BelongsToCreateAssociationMixin<Blog>;
  // atmaping belongsTo tag
  gettag!: Sequelize.BelongsToGetAssociationMixin<Tag>;
  settag!: Sequelize.BelongsToSetAssociationMixin<Tag, tagId>;
  createtag!: Sequelize.BelongsToCreateAssociationMixin<Tag>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Atmaping {
    Atmaping.init({
    atmId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "文章标签映射表id"
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "博客文章id",
      references: {
        model: 'blog',
        key: 'blogId'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "标签id",
      references: {
        model: 'tag',
        key: 'tagId'
      }
    }
  }, {
    sequelize,
    tableName: 'atmaping',
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
          { name: "atmId" },
        ]
      },
      {
        name: "foreign_articleId",
        using: "BTREE",
        fields: [
          { name: "articleId" },
        ]
      },
      {
        name: "foreign_tagId",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
    ]
  });
  return Atmaping;
  }
}
