import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import sequelize from './sequelize';

export default class Price extends Model<InferAttributes<Price>, InferCreationAttributes<Price>> {
  declare id: string;
  declare amount: number;
}

export type TPriceAttributes = InferAttributes<Price>;

Price.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);

