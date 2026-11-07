import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type ForeignKey } from 'sequelize';
import sequelize from './sequelize';
import type Product from './Product';

export default class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
  declare id: CreationOptional<number>;
  declare url: string;
  declare productId: ForeignKey<Product['id']>;
}

export type TImageAttributes = InferAttributes<Image>;

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

