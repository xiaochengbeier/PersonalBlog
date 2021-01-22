import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, userId } from './user';

export interface ProjectAttributes {
  projectId?: number;
  userId?: number;
  content: string;
  source: string;
}

export type projectPk = "projectId";
export type projectId = Project[projectPk];
export type projectCreationAttributes = Optional<ProjectAttributes, projectPk>;

export class Project extends Model<ProjectAttributes, projectCreationAttributes> implements ProjectAttributes {
    projectId?: number;
    userId?: number;
    content: string;
    source: string;

  // blog belongsTo user
  getuser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<User, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Project {
    Project.init({
    projectId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "项目表主键"
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
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "项目访问路径",
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "源码路径",
    }
  }, {
    sequelize,
    tableName: 'project',
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
          { name: "projectId" },
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
  return Project;
  }
}
