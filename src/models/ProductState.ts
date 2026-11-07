import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type ForeignKey, type NonAttribute, Association } from 'sequelize';
import sequelize from './sequelize';
import type User from './User';
import Product from './Product';

export default class ProductState extends Model<
        InferAttributes<ProductState>,
        InferCreationAttributes<ProductState>
> {
        declare id: CreationOptional<number>;
        declare userId: ForeignKey<User['id']>;
        declare productId: ForeignKey<Product['id']>;
        declare isInCart: CreationOptional<boolean>;
        declare isWishlisted: CreationOptional<boolean>;
        declare isPurchased: CreationOptional<boolean>;
        declare quantity: CreationOptional<number>;
        declare addedAt: CreationOptional<Date>;

        declare Product?: NonAttribute<Product>;

        declare static associations: {
                Product: Association<ProductState, Product>;
        };
}


export type TProductStateAttributes = InferAttributes<ProductState>;

ProductState.init(
        {
                id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                },
                userId: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                productId: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                isInCart: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                },
                isWishlisted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                },
                isPurchased: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                },
                quantity: {
                        type: DataTypes.INTEGER,
                        defaultValue: 1,
                },
                addedAt: {
                        type: DataTypes.DATE,
                        defaultValue: DataTypes.NOW,
                },
        },
        {
                sequelize,
                defaultScope: {
                        include: [{ model: Product }],
                },
        }
);

