import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Atmaping, atmapingId } from './atmaping';

export interface TagAttributes {
  tagId: number;
  tagname: string;
  number: number;
}

export type tagPk = "tagId";
export type tagId = Tag[tagPk];
export type tagCreationAttributes = Optional<TagAttributes, tagPk>;

export class Tag extends Model<TagAttributes, tagCreationAttributes> implements TagAttributes {
  tagId!: number;
  tagname!: string;
  number!: number;

  // tag hasMany atmaping
  getatmapings!: Sequelize.HasManyGetAssociationsMixin<Atmaping>;
  setatmapings!: Sequelize.HasManySetAssociationsMixin<Atmaping, atmapingId>;
  addatmaping!: Sequelize.HasManyAddAssociationsMixin<Atmaping, atmapingId>;
  removeatmaping!: Sequelize.HasManyRemoveAssociationsMixin<Atmaping, atmapingId>;
  hasatmaping!: Sequelize.HasManyHasAssociationsMixin<Atmaping, atmapingId>;
  countatmapings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tag {
    Tag.init({
    tagId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "标签id"
    },
    tagname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "标签名字",
      unique: "unique_tagename"
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "此标签对应的文章数量"
    }
  }, {
    sequelize,
    tableName: 'tag',
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
          { name: "tagId" },
        ]
      },
      {
        name: "unique_tagename",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tagname" },
        ]
      },
    ]
  });
  return Tag;
  }
}
