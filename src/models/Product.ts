import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type ForeignKey, Association, type NonAttribute } from 'sequelize';
import sequelize from './sequelize';
import Price from './Price';
import Image from './Image';

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
        declare id: string;
        declare title: string;
        declare description: string;
        declare category: string;
        declare rating: number;
        declare discountPercentage: number | null;
        declare stock: number;
        declare priceId: ForeignKey<Price['id']>;

        declare Image?: NonAttribute<Image>;
        declare Price?: NonAttribute<Price>;

        declare static associations: {
                Image: Association<Product, Image>;
                Price: Association<Product, Price>;
        };
}

export type TProductAttributes = InferAttributes<Product>;

Product.init(
        {
                id: {
                        type: DataTypes.STRING,
                        primaryKey: true,
                },
                title: {
                        type: DataTypes.STRING,
                        unique: true,
                        allowNull: false,
                },
                description: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                category: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                rating: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
                discountPercentage: {
                        type: DataTypes.INTEGER,
                        allowNull: true,
                },
                stock: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
                priceId: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
        },
        {
                sequelize,
                defaultScope: {
                        include: [{ model: Image }, { model: Price }],
                }
        }
);

