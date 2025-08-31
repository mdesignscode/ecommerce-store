import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import sequelize from './sequelize';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: CreationOptional<string>;
        declare name: string;
        declare checkoutId: CreationOptional<string | null>;
        declare isVerified: CreationOptional<boolean>;
        declare avatar: CreationOptional<string>;
        declare password: string;
        declare email: string;
}

export type TUserAttributes = InferAttributes<User>;

const avatar = '/images/icons8-user-64.png';

User.init(
        {
                id: {
                        type: DataTypes.STRING,
                        primaryKey: true,
                },
                name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                },
                checkoutId: {
                        type: DataTypes.STRING,
                        allowNull: true,
                },
                isVerified: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                },
                password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                        set(email: string) {
                                const lowerEmail = email.toLowerCase();
                                this.setDataValue('email', lowerEmail);
                        },
                },
                avatar: {
                        type: DataTypes.STRING,
                        defaultValue: avatar,
                }
        },
        { sequelize }
);

